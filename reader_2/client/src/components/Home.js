import { useState, useEffect, useContext } from "react"
import { UserContext } from "./UserContext"
import BookList from "./BookList"

export default function Home({ books, onDeleteBook }) {
  const {user} = useContext(UserContext)
  
  if (!user) return <p>Loading...</p>

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
          <BookList books={user.books} onDeleteBook={handleDeleteBook} />

        </div>
      )
}