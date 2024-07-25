import { useState, useEffect } from "react"
import BookList from "./BookList"

export default function Home({ books, onDeleteBook }) {

    // const getBooks = async () => {
    //     try {
    //         const response = await fetch("/api/books")
    //         const books = await response.json()
    //         setBooks(books)
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     getBooks()
    // }, [])

    function handleDeleteBook(deletedBook) {
        onDeleteBook(deletedBook)
    }

    return (
        <div className="App">
          <h1>My books</h1>
          <BookList books={books} onDeleteBook={handleDeleteBook} />

        </div>
      )
}