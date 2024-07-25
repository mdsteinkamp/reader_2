import { useState, useContext } from "react"
import { UserContext } from "./UserContext"

export default function AddBook({ books, onAddBook }) {
    const {user} = useContext(UserContext)
    const [formData, setFormData] = useState({
        title: "",
      })
      const [errors, setErrors] = useState([])

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({
          ...formData,
          user: user,
          completed: false,
          [name]: value
        })
      }

    console.log("in add book", books)

      function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        fetch("/api/books/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        })
        .then((resp) => {
          if (resp.ok) {
            resp.json().then(book => {
                // const updatedBooks = [...books, book]
                // console.log(updatedBooks)
                handleAddBook(book)
            })
          } else {
            resp.json().then(e => {
              setErrors(e.errors)
              console.log(errors)
            })
          }
        })
      }

    function handleAddBook(newBook) {
      onAddBook(newBook)
    }

    return (
        <div>
            <h2>add book here!</h2>
            <form onSubmit={handleSubmit}>
                <h3>Name</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <br /> 
                <button>Add Book To Your List</button>
            </form>
        </div>
    )
}