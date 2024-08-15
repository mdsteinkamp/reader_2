import { useState } from "react"
import { useParams, useLocation } from "react-router-dom"

export default function CharacterPage({ state }) {
    const {id} = useParams()
    const location = useLocation()
    const {book} = location.state
    console.log(book)
    const [currentBook] = useState(book)


    const character = book.characters.find(char => char.id === parseInt(id))

    // const character = user.books.find(char => char.id === parseInt(id))

    return (
        <div>
            <p>Name: {character.name}</p>
            <p>Appearance: {character.appearance}</p>
            <p>Locations: {character.locations}</p>
            <p>Positions/Duties: {character.position}</p>
            <p>Friends/Associates: {character.associates}</p>
            <p>Knowledge: {character.knowledge}</p>

        </div>
    )
}