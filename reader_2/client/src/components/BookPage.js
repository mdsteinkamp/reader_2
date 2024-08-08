import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"
import { useParams } from "react-router-dom"

export default function BookPage() {
    const {user} = useContext(UserContext)
    const {id} = useParams()

    const book = user.books.find(book => book.id === parseInt(id))

    return (
        <div>
            <h3>{book.title}</h3>

            <h4>Characters</h4>
            <ul>{book.characters.map(character => (
                <div>
                    <p>{character.name}</p>
                <Link to={`characters/${character.id}/`} state={{ book }}>
                    <h4>{character.name}</h4>
                    </Link>
                </div>
                ))}
            </ul>

        </div>
    )
}