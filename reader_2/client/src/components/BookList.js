import BookPage from "./BookPage"


export default function BookList({ books }) {

    console.log(books)

    return (
        <div>
            <ul>{books.map(book => (
                <BookPage key={book.id} book={book} />    
            ))}
            </ul>
        </div>
    )
}