import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"
import { json } from "react-router-dom"

export default function BookItem ({ book, onDeleteBook, onCompleteBook }) {
    const {user} = useContext(UserContext)
    const [isCompleted, setIsCompleted] = useState(book.completed)

    if (!user) return <h1>Loading...</h1>
    console.log(book)

    
    function handleDeleteBook(deletedBook) {

        onDeleteBook(deletedBook)
    }

    async function deleteBook () {
        try {
            const response = await fetch(`api/books/${book.id}`, {
                method: "DELETE"
            })
        if (response.ok) {
            handleDeleteBook(book)
        } else {
            console.log("could not find the book")
        }
            
        } catch (err) {
            console.log(err)
        }
    }

    async function handleUpdateBook() {
        setIsCompleted(isCompleted => !isCompleted)
        const updatedBook = ({...book, completed: !isCompleted})
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
            const completedBook = await response.json()
            console.log("updated!")
            console.log(completedBook)
            onCompleteBook(completedBook)
        } else {
            console.log("error updating book")
        }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Link to={`${book.id}/`}>
                <h4>{book.title}</h4>
            </Link>
            <input 
                type="checkbox"
                id="completed"
                name="completed"
                checked={book.completed}
                onChange={handleUpdateBook}
            />
            <label htmlFor="completed">Completed</label>
            <br />
            <button onClick={deleteBook}>Remove book from your list</button>
        </div>
    )
}