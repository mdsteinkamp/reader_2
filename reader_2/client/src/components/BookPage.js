import { useState, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { UserContext } from "./UserContext"
import { useParams } from "react-router-dom"
import AddCharacter from "./AddCharacter"

export default function BookPage() {
    const {user} = useContext(UserContext)
    const {id} = useParams()

    if (!user) return <h1>Please log in!</h1>


    const book = user.books.find(book => book.id === parseInt(id))

    return (
        <div>
            <h3>{book.title}</h3>

            <h1>Characters</h1>
            <br />
            <NavLink to={`/books/${book.id}/characters/new`} element={<AddCharacter />}>Add Character</NavLink>
            <ul>{book.characters.map(character => (
                    <div key={character.id}>
                    <Link to={`characters/${character.id}/`} state={{ book }}>
                        <h4>{character.name}</h4>
                        </Link>
                    </div>
                ))}
            </ul>
        </div>
    )
}