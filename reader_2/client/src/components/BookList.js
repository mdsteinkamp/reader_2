import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "./UserContext"
import BookPage from "./BookPage"
import AddBook from "./AddBook"


export default function BookList({ books, onDeleteBook }) {
    const {user} = useContext(UserContext)

    if (!user) return <h1>Loading...</h1>

    function handleDeleteBook(deletedBook) {
        onDeleteBook(deletedBook)
    }

    return (
        <div>
            <br />
            <NavLink to="/books/new" element={<AddBook />}>Add Book</NavLink>
          <h1>My books</h1>


            <ul>{user.books.map(book => (
                <BookPage key={book.id} book={book} onDeleteBook={handleDeleteBook} />    
            ))}
            </ul>
        </div>
    )
}