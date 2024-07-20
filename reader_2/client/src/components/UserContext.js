import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode"

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [jwt, setJwt] = useState("")

    const jwtSecret = 'dontkeepthisinsettingsinfuture'
    
    console.log(localStorage.getItem("token"))
    const token = localStorage.getItem("token")
    console.log(token)

    // useEffect(() => {
    //     setJwt(jwtDecode(token))
    // }, [])

    useEffect(() => {
        fetch("/api/me/", {
            headers: {
                "Authorization": token
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