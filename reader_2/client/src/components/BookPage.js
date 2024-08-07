import { useContext } from "react"
import { UserContext } from "./UserContext"
import { useParams } from "react-router-dom"

export default function BookPage() {
    const {user} = useContext(UserContext)
    const {id} = useParams()

    const book = user.books.find(book => book.id === parseInt(id))

    return (
        <p>{book.title}</p>
    )
}