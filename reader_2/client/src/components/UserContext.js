import { useState, useEffect, createContext } from "react";

const UserContext = createContext()

function UserProvider({ children }) {

    console.log(localStorage.getItem("token"))
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch("/api/me/").then((resp) => {
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