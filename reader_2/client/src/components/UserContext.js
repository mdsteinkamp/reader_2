import { useState, useEffect, createContext } from "react";

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    
    console.log(localStorage.getItem("token"))
    const token = localStorage.getItem("token")

    useEffect(() => {
        fetch("/api/me/", {
            headers: {
                "Authorization": `Bearer ${token}`
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