import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode"

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"))

    const jwtSecret = 'dontkeepthisinsettingsinfuture'
    
    const token = localStorage.getItem("jwt")
    console.log(token)

    // useEffect(() => {
    //     setJwt(jwtDecode(token))
    // }, [token])

    useEffect(() => {
        fetch("/api/me/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => console.log(user))
            } else {
                console.log(resp)
            }
        })
    }, [])

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider}