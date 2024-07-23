import { useState, useEffect } from "react"

export default function Home() {
    const [books, setBooks] = useState([])

    const getBooks = async () => {
        try {
            const response = await fetch("/api/books")
            const books = await response.json()
            console.log(books)
            setBooks(books)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <div className="App">
          <h1>My books</h1>

        </div>
      )
}