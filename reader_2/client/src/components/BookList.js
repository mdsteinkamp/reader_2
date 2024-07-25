import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "./UserContext"
import BookPage from "./BookPage"
import AddBook from "./AddBook"


export default function BookList({ books, onDeleteBook }) {
    const {user} = useContext(UserContext)
    // console.log("in bookslist", user)

    console.log("in bookslist", books)

    if (!user) return <h1>Loading...</h1>

    function handleDeleteBook(deletedBook) {
        onDeleteBook(deletedBook)
    }

    return (
        <div>
            <NavLink to="/books/new" element={<AddBook />}>Add Book</NavLink>

            <ul>{books.map(book => (
                <BookPage key={book.id} book={book} onDeleteBook={handleDeleteBook} />    
            ))}
            </ul>
        </div>
    )
}