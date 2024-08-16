import { useState, useContext } from "react"
import { useParams, useLocation, NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext"
import EditCharacter from "./EditCharacter"

export default function CharacterPage({ state, onDeleteCharacter }) {
    const {user} = useContext(UserContext)
    const {id} = useParams()
    const location = useLocation()
    const {book = null} = location.state
    const [currentBook] = useState(book)
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState(book.characters.find(char => char.id === parseInt(id)).name)
    const navigate = useNavigate()
    
    if (!user) return <h1>Please log in!</h1>
    if (book === null) return <h1>please go home</h1>

    console.log(name)
    console.log(location.state)
    
    
    
    const character = currentBook.characters.find(char => char.id === parseInt(id))
    console.log(character)

    // const character = user.books.find(char => char.id === parseInt(id))

    async function handleDeleteCharacter() {
        try {
            const response = await fetch(`/api/characters/${character.id}`, {
                method: "DELETE"
            })
        if (response.ok) {
            onDeleteCharacter(book, character)
        } else {
            console.log("could not find the character")
        }
            
        } catch (err) {
            console.log(err)
        }
    }

    function handleEditName() {
        setEditName(true)
    }

    async function handleSubmitName(e){
        e.preventDefault()
        console.log('edit name')
        const updatedCharacter = ({...character, name: name})
        console.log(updatedCharacter)
        try {
            const response = await fetch(`/api/characters/${character.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedCharacter),
                credentials: "include",
            })
        if (response.ok) {
            const completedCharacter = await response.json()
            console.log("updated!")
            console.log(completedCharacter)
            // onCompleteBook(completedCharacter)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <div>
            <h2>Character Info</h2>
            {editName ? 
                <form onSubmit={handleSubmitName}>
                    <h3>Name</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button>Submit</button>
                </form>
            : <span>Name: {character.name}  <button onClick={handleEditName}>edit</button></span>}
            <br />

            <span>Appearance: {character.appearance}  <button>edit</button></span>
            <br />

            <span>Locations: {character.locations}  <button>edit</button></span>
            <br />

            <span>Positions/Duties: {character.position}  <button>edit</button></span>
            <br />

            <span>Friends/Associates: {character.associates}  <button>edit</button></span>
            <br />

            <span>Knowledge: {character.knowledge}  <button>edit</button></span>
            <br />
            
            <br />
            <button onClick={handleDeleteCharacter}>Remove Character</button>

            {/* <NavLink to={`/books/${book.id}/characters/edit`} state={{ location }} element={<EditCharacter />}><button>Edit Character</button></NavLink>
            <button onClick={() => navigate(`/books/${book.id}/characters/edit`)}>Edit Character</button> */}


        </div>
    )
}