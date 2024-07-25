import { useContext } from "react"
import { UserContext } from "./UserContext"

export default function BookPage ({ book }) {
    const {user} = useContext(UserContext)
    console.log(book)

    return (
        <div>
            <h4>here is a book</h4>
            <p>{book.title}</p>
            <input 
                type="checkbox"
                id="completed"
                name="completed"
                value="completed" />
            <label for="completed">Completed</label>
        </div>
    )
}