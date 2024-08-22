import { useState, useContext } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { UserContext } from "./UserContext"
import { useParams } from "react-router-dom"
import AddCharacter from "./AddCharacter"

export default function BookPage() {
    const {user} = useContext(UserContext)
    const location = useLocation()
    const {id} = useParams()

    if (!user) return <h1>Please log in!</h1>


    const book = user.books.find(book => book.id === parseInt(id))
    const sortedCharacters = book.characters.sort((a, b) => a.name.localeCompare(b.name))
    // const bookID = book.id

    return (
        <div>
            <h3>{book.title}</h3>

            <h1>Characters</h1>
            <br />
            <NavLink to={`/books/${book.id}/characters/new`} state={{ book }} element={<AddCharacter />}>Add Character</NavLink>
            <ul>{sortedCharacters.map(character => (
                    <div key={character.id}>
                    <NavLink to={`characters/${character.id}/`} state={{ location, bookID: book.id, characterID: character.id }}>
                        <h4>{character.name}</h4>
                        </NavLink>
                    </div>
                ))}
            </ul>
        </div>
    )
}