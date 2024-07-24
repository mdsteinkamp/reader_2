import { NavLink } from "react-router-dom"
import BookPage from "./BookPage"
import AddBook from "./AddBook"


export default function BookList({ books }) {

    console.log(books)

    return (
        <div>
            <NavLink to="/books/new" element={<AddBook />}>Add Book</NavLink>

            <ul>{books.map(book => (
                <BookPage key={book.id} book={book} />    
            ))}
            </ul>
        </div>
    )
}