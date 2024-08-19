import { useState, useContext } from "react"
import { useParams, useLocation, NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext"
import EditCharacter from "./EditCharacter"

export default function CharacterPage({ state, onDeleteCharacter, onUpdateCharacter }) {
    const {user} = useContext(UserContext)
    const {id} = useParams()
    const location = useLocation()
    const {book = null} = location.state
    const [currentBook] = useState(book)
    const [editName, setEditName] = useState(false)
    const [editAppearance, setEditAppearance] = useState(false)
    const [editLocations, setEditLocations] = useState(false)
    const [editPositions, setEditPositions] = useState(false)
    const [editFriends, setEditFriends] = useState(false)
    const [editKnowledge, setEditKnowledge] = useState(false)
    const [name, setName] = useState(book.characters.find(char => char.id === parseInt(id)).name)
    const [appearance, setAppearance] = useState(book.characters.find(char => char.id === parseInt(id)).appearance)
    const [locations, setLocations] = useState(book.characters.find(char => char.id === parseInt(id)).locations)
    const [positions, setPositions] = useState(book.characters.find(char => char.id === parseInt(id)).position)
    const [friends, setFriends] = useState(book.characters.find(char => char.id === parseInt(id)).associates)
    const [knowledge, setKnowledge] = useState(book.characters.find(char => char.id === parseInt(id)).knowledge)
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
            handleUpdateCharacter(completedCharacter.id, "name", name)
            setEditName(false)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    async function handleSubmitAppearance(e){
        e.preventDefault()
        console.log('edit name')
        const updatedCharacter = ({...character, appearance: appearance})
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
            handleUpdateCharacter(completedCharacter.id, "appearance", appearance)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    async function handleSubmitLocations(e){
        e.preventDefault()
        console.log('edit name')
        const updatedCharacter = ({...character, locations: locations})
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
            handleUpdateCharacter(completedCharacter.id, "locations", locations)
            // onCompleteBook(completedCharacter)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    async function handleSubmitPositions(e){
        e.preventDefault()
        console.log('edit name')
        const updatedCharacter = ({...character, position: positions})
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
            handleUpdateCharacter(completedCharacter.id, "position", positions)
            // onCompleteBook(completedCharacter)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    async function handleSubmitFriends(e){
        e.preventDefault()
        console.log('edit name')
        const updatedCharacter = ({...character, associates: friends})
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
            handleUpdateCharacter(completedCharacter.id, "associates", friends)
            // onCompleteBook(completedCharacter)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    async function handleSubmitKnowledge(e){
        e.preventDefault()
        console.log('edit name')
        const updatedCharacter = ({...character, knowledge: knowledge})
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
            handleUpdateCharacter(completedCharacter.id, "knowledge", knowledge)
            // handleUpdateCharacter(knowledge)
            // onCompleteBook(completedCharacter)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    function handleUpdateCharacter(id, attrib, value) {
        const charInfoObj = {id: id, element: attrib, value: value}
        onUpdateCharacter(book, charInfoObj)
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
            : <span>Name: {character.name}  <button onClick={e => setEditName(true)}>edit</button></span>
            }
            <br />

            {editAppearance ? 
                <form onSubmit={handleSubmitAppearance}>
                    <h3>Appearance</h3>
                    <input
                        type="text"
                        name="appearance"
                        placeholder="Appearance"
                        value={appearance}
                        onChange={e => setAppearance(e.target.value)}
                    />  
                    <button>Submit</button>
                </form>
            : <span>Appearance: {character.appearance}  <button onClick={e => setEditAppearance(true)}>edit</button></span>
            }
            <br />
            {editLocations ?
                <form onSubmit={handleSubmitLocations}>
                    <h3>Locations</h3>
                    <input
                        type="text"
                        name="locations"
                        placeholder="Locations"
                        value={locations}
                        onChange={e => setLocations(e.target.value)}
                    />  
                    <button>Submit</button>
                </form>
            
            : <span>Locations: {character.locations}  <button onClick={e => setEditLocations(true)}>edit</button></span>
            }
            <br />
            {editPositions ?
                <form onSubmit={handleSubmitPositions}>
                    <h3>Positions</h3>
                    <input
                        type="text"
                        name="positions"
                        placeholder="Positions/Duties"
                        value={positions}
                        onChange={e => setPositions(e.target.value)}
                    />  
                    <button>Submit</button>
                </form>
            : <span>Positions/Duties: {character.position}  <button onClick={(e => setEditPositions(true))}>edit</button></span>
            }
            <br />

            {editFriends ? 
                <form onSubmit={handleSubmitFriends}>
                    <h3>Friends</h3>
                    <input
                        type="text"
                        name="friends"
                        placeholder="Friends/Associates"
                        value={friends}
                        onChange={e => setFriends(e.target.value)}
                    />  
                    <button>Submit</button>
                </form>
            : <span>Friends/Associates: {character.associates}  <button onClick={e => setEditFriends(true)}>edit</button></span>
            }

            
            <br />
            {editKnowledge ?
                <form onSubmit={handleSubmitKnowledge}>
                    <h3>Knowledge</h3>
                    <input
                        type="text"
                        name="knowledge"
                        placeholder="Knowledge"
                        value={knowledge}
                        onChange={e => setKnowledge(e.target.value)}
                    />  
                    <button>Submit</button>
                </form>
            : <span>Knowledge: {character.knowledge}  <button onClick={e => setEditKnowledge(true)}>edit</button></span>
            }
            
            <br />
            
            <br />
            <button onClick={handleDeleteCharacter}>Remove Character</button>

            {/* <NavLink to={`/books/${book.id}/characters/edit`} state={{ location }} element={<EditCharacter />}><button>Edit Character</button></NavLink>
            <button onClick={() => navigate(`/books/${book.id}/characters/edit`)}>Edit Character</button> */}


        </div>
    )
}