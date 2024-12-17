import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode"

const CharactersContext = createContext()

function CharactersProvider({ children }) {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetch("/api/characters/", {
            method: "GET",
            // headers: {
            //     Authorization: `Bearer ${token}`
            // }
        }).then((resp) => {
            if (resp.ok) {
                
                resp.json().then((chars) => setCharacters(chars))
            } else {
                console.log(resp)
            }
        })
    }, [])

    return <CharactersContext.Provider value={{ characters, setCharacters }}>{children}</CharactersContext.Provider>
}

export { CharactersContext, CharactersProvider}