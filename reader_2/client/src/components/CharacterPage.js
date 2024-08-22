import { useState, useEffect, useContext } from "react"
import { useParams, useLocation, NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "./UserContext"
import EditCharacter from "./EditCharacter"

export default function CharacterPage({ state, onDeleteCharacter, onUpdateCharacter }) {
    const {user, setUser} = useContext(UserContext)
    const {id} = useParams()
    const location = useLocation()
    // const {bookID = null} = state
    // const [currentBook, setCurrentBook] = useState(null)
    const [editName, setEditName] = useState(false)
    const [editAppearance, setEditAppearance] = useState(false) 
    const [editLocations, setEditLocations] = useState(false)
    const [editPositions, setEditPositions] = useState(false)
    const [editFriends, setEditFriends] = useState(false)
    const [editKnowledge, setEditKnowledge] = useState(false)
    const [name, setName] = useState(null)
    const [appearance, setAppearance] = useState()
    const [locations, setLocations] = useState(null)
    const [positions, setPositions] = useState(null)
    const [friends, setFriends] = useState(null)
    const [knowledge, setKnowledge] = useState(null)
    const [character, setCharacter] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/api/characters/${location.state.characterID}`, {
            method: "GET",
        }).then((resp) => {
            if (resp.ok) {
                resp.json().then((char) => {
                    console.log("used fetch")
                    setCharacter(char)
                    setName(char.name)
                    setAppearance(char.appearance)
                    setLocations(char.locations)
                    setPositions(char.position)
                    setFriends(char.associates)
                    setKnowledge(char.knowledge)
                })
            } else {
                console.log(resp)
            }
        })
    }, [location])

    if (!user, !character) return <h1>Please log in!</h1>
    if (location.state.bookID === null) return <h1>please go home</h1>

    const currentBook = user.books.find(b => b.id === location.state.bookID)

    // setName(currentBook.characters.find(char => char.id === parseInt(id)).name)
    // setAppearance(currentBook.characters.find(char => char.id === parseInt(id)).appearance)
    // setLocations(currentBook.characters.find(char => char.id === parseInt(id)).locations)
    // setPositions(currentBook.characters.find(char => char.id === parseInt(id)).position)
    // setFriends(currentBook.characters.find(char => char.id === parseInt(id)).associates)
    // setKnowledge(currentBook.characters.find(char => char.id === parseInt(id)).knowledge)

    // setCurrentBook(user.books.find(b => b.id === location.state.bookID))

    // const currentBook = user.books.find(b => b.id === location.state.bookID)
    // console.log("in char page", currentBook)

    // useEffect( () => {
    //     try {
    //         const response = await fetch(`/api/characters/${id}/`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             credentials: "include",
    //         })
    //     if (response.ok) {
    //         const currentCharacter = await response.json()
    //         console.log(currentCharacter)
    //     } else {
    //         console.log("error updating character")
    //     }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }, [name, appearance, locations, positions, friends, knowledge])



    // const character = currentBook.characters.find(char => char.id === parseInt(id))

    // const character = user.books.find(char => char.id === parseInt(id))

    async function handleDeleteCharacter() {
        try {
            const response = await fetch(`/api/characters/${character.id}`, {
                method: "DELETE"
            })
        if (response.ok) {
            onDeleteCharacter(currentBook, character)
        } else {
            console.log("could not find the character")
        }
            
        } catch (err) {
            console.log(err)
        }
    }

    async function handleSubmitName(e){
        e.preventDefault()
        const updatedCharacter = ({...character, name: name})
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
            handleUpdateCharacter(completedCharacter.id, "name", name)
            setEditName(false)
            window.location.reload()
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
    }

    async function handleSubmitAppearance(e){
        e.preventDefault()
        const updatedCharacter = ({...character, appearance: appearance})
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
            handleUpdateCharacter(completedCharacter.id, "appearance", appearance)
            setEditAppearance(false)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    async function handleSubmitLocations(e){
        e.preventDefault()
        const updatedCharacter = ({...character, locations: locations})
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
            handleUpdateCharacter(completedCharacter.id, "locations", locations)
            setEditLocations(false)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    async function handleSubmitPositions(e){
        e.preventDefault()
        const updatedCharacter = ({...character, position: positions})
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
            handleUpdateCharacter(completedCharacter.id, "position", positions)
            setEditPositions(false)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    async function handleSubmitFriends(e){
        e.preventDefault()
        const updatedCharacter = ({...character, associates: friends})
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
            handleUpdateCharacter(completedCharacter.id, "associates", friends)
            setEditFriends(false)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    async function handleSubmitKnowledge(e){
        e.preventDefault()
        const updatedCharacter = ({...character, knowledge: knowledge})
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
            handleUpdateCharacter(completedCharacter.id, "knowledge", knowledge)
            setEditKnowledge(false)
        } else {
            console.log("error updating character")
        }
        } catch (err) {
            console.log(err)
        }
        
    }

    function handleUpdateCharacter(id, attrib, value) {
        const charInfoObj = {id: id, element: attrib, value: value}
        onUpdateCharacter(currentBook, charInfoObj)
    }

    // return (<p>hi</p>)

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
            : <span>Name: {name}  <button onClick={e => setEditName(true)}>edit</button></span>
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
            : <span>Appearance: {appearance}  <button onClick={e => setEditAppearance(true)}>edit</button></span>
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
            
            : <span>Locations: {locations}  <button onClick={e => setEditLocations(true)}>edit</button></span>
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
            : <span>Positions/Duties: {positions}  <button onClick={(e => setEditPositions(true))}>edit</button></span>
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
            : <span>Friends/Associates: {friends}  <button onClick={e => setEditFriends(true)}>edit</button></span>
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
            : <span>Knowledge: {knowledge}  <button onClick={e => setEditKnowledge(true)}>edit</button></span>
            }
            
            <br />
            
            <br />
            <button onClick={handleDeleteCharacter}>Remove Character</button>

            {/* <NavLink to={`/books/${book.id}/characters/edit`} state={{ location }} element={<EditCharacter />}><button>Edit Character</button></NavLink>
            <button onClick={() => navigate(`/books/${book.id}/characters/edit`)}>Edit Character</button> */}


        </div>
    )
}