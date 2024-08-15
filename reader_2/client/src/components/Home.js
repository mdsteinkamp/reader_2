import { useState, useEffect, useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "./UserContext"
import BookList from "./BookList"

export default function Home({ books, onDeleteBook }) {
  const {user} = useContext(UserContext)
  
  if (!user) return <p>Please Log In...</p>

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
          <br />
                <NavLink to="/books">See My Books</NavLink>


        </div>
      )
}