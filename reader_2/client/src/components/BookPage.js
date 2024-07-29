import { useState, useContext } from "react"
import { UserContext } from "./UserContext"
import { json } from "react-router-dom"

export default function BookPage ({ book, onDeleteBook }) {
    const {user} = useContext(UserContext)
    const [isCompleted, setIsCompleted] = useState(book.completed)

    function handleDeleteBook(deletedBook) {

        onDeleteBook(deletedBook)
    }

    async function deleteBook () {
        try {
            const response = await fetch(`api/books/${book.id}`, {
                method: "DELETE"
            })
        if (response.ok) {
            console.log(response)
            // const deletedBook = await response.json()
            handleDeleteBook(book)
        } else {
            console.log("could not find the book")
        }
            
        } catch (err) {
            console.log(err)
        }
    }

    function handleCompleteBook() {
        setIsCompleted(isCompleted => !isCompleted)
        const updatedBook = ({...book, completed: !isCompleted})
        console.log(updatedBook)
        handleUpdateBook(updatedBook)
    }



    async function handleUpdateBook(updatedBook) {
        try {
            const response = await fetch(`api/books/${book.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBook),
                credentials: "include",
            })
        if (response.ok) {
            console.log(response)
            // const deletedBook = await response.json()
            console.log("updated!")
        } else {
            console.log("error updating book")
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
                value="completed"
                onClick={handleCompleteBook}
            />
            <label htmlFor="completed">Completed</label>
            <br />
            <button onClick={deleteBook}>Remove book from your list</button>
        </div>
    )
}