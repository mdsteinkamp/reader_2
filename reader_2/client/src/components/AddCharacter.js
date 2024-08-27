import { useState, useContext } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext"

export default function AddCharacter({ state, onAddCharacter }) {
    const {user} = useContext(UserContext)
    const {id} = useParams()
    const location = useLocation()
    const {book} = location.state
    const [formData, setFormData] = useState({
        name: "",
        appearance: "",
        locations: "",
        associates: "",
        position: "",
        knowledge: "",
      })
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    if (!user) return <h1>Please log in!</h1>

    // const book = user.books.find(book => book.id === parseInt(id))

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({
          ...formData,
          book: book,
          [name]: value
        })
      }

      function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        fetch("/api/characters/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        })
        .then((resp) => {
          if (resp.ok) {
            resp.json().then(character => {

                handleAddCharacter(character)
                navigate(`/books/${book.id}`)
            })
          } else {
            resp.json().then(e => {
              setErrors(e.errors)
              console.log(errors)
            })
          }
        })
      }

    function handleAddCharacter(newCharacter) {
      onAddCharacter(book, newCharacter)
    }
    
    return (
        <div>
            <h1>Add Characer</h1>
            <form onSubmit={handleSubmit}>
                <h3>Name</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.title}
                    onChange={handleChange}
                />
                <br /> 
                <input
                    type="text"
                    name="appearance"
                    placeholder="Appearance"
                    value={formData.appearance}
                    onChange={handleChange}
                />
                <br /> 
                <input
                    type="text"
                    name="locations"
                    placeholder="Locations"
                    value={formData.locations}
                    onChange={handleChange}
                />
                <br /> 
                <input
                    type="text"
                    name="associates"
                    placeholder="Associates"
                    value={formData.associates}
                    onChange={handleChange}
                />
                <br /> 
                <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={formData.position}
                    onChange={handleChange}
                />
                <br /> 
                <input
                    type="text"
                    name="knowledge"
                    placeholder="Knowledge"
                    value={formData.knowledge}
                    onChange={handleChange}
                />
                <br /> 
                <button>Add Character to Book</button>
            </form>
        </div>
    )
}