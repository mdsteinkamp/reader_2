import { useState, useEffect, createContext } from "react";

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/me/").then((resp) => {
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