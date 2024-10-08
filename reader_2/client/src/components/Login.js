import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext"

export default function Login({ onAddBooks }) {
    const [formData, setFormData]  = useState({username: "", password: ""})
    const [books, setBooks] = useState([])
    const [errors, setErrors] = useState([])
    const [token, setToken] = useState(localStorage.getItem("jwt"))
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({
          ...formData,
          [name]: value
        })
      }
    
      function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        fetch("/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        })
        .then((resp) => {
          if (resp.ok) {
            console.log((Array.from(resp.headers.entries())))
            const tokenArray = Array.from(resp.headers.entries().filter(h => h[0] === "jwt"))
            setToken((Array.from(resp.headers.entries().filter(h => h[0] === "jwt")))[0][1])
            // localStorage.setItem("token", tokenArray.pop()[1])
            // console.log(resp.headers.entries().filter(header => header[0] === "token"))
            resp.json().then((user) => {
              setUser(user)
              console.log(user)
              // getBooks()
              navigate("/books")

          })} else {
            resp.json().then(e => {
              setErrors(e.errors)
              console.log(errors)
            })
          }
        })
      }

    const getBooks = async () => {
        try {
            const response = await fetch("/api/books")
            const books = await response.json()
            setBooks(books)
            handleFetchBooks(books)
        } catch(error) {
            console.log(error)
        }
    }

    function handleFetchBooks(books) {
      onAddBooks(books)
    }

    return (
        <div>
            <h1>sign in</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        />
                    <button>Submit</button>
                </form>

        </div>

    )
}