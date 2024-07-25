import { useContext } from "react"
import { UserContext } from "./UserContext"

export default function BookPage ({ book, onDeleteBook }) {
    const {user} = useContext(UserContext)
    console.log(book)

    function handleDeleteBook(deletedBook) {
        onDeleteBook(deletedBook)
    }

    async function deleteBook () {
        try{
            const response = await fetch(`api/books/${book.id}`, {
                method: "DELETE"
            })
        if (response.ok) {
            console.log(response)
            const deletedBook = response.json()
            console.log(deletedBook)
            handleDeleteBook(deletedBook)
        } else {
            console.log("could not find the book")
        }
            
        } catch (err) {
            console.log(err)
        }
    }

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
            <br />
            <button onClick={deleteBook}>Remove book from your list</button>
        </div>
    )
}