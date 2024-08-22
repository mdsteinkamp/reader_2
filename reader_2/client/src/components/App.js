import { useEffect, useState, useContext } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import { UserContext } from './UserContext'
import '../App.css';
import Login from './Login'
import Logout from './Logout'
import Home from './Home'
import AddBook from './AddBook'
import BookList from './BookList'
import BookPage from './BookPage'
import CharacterPage from './CharacterPage'
import AddCharacter from './AddCharacter';
import EditCharacter from './EditCharacter';

function App() {
  // const [formData, setFormData]  = useState({username: "", password: ""})
  // const [errors, setErrors] = useState([])
  // const [token, setToken] = useState(localStorage.getItem("jwt"))
  const {user, setUser} = useContext(UserContext)
  const [books, setBooks] = useState([])

  // console.log(user)

  

  function handleFetchBooks(books) {
    setBooks(books)
  }

  function handleAddBook(newBook) {
    const updatedBooks = [...user.books, newBook]
    setBooks(updatedBooks)
    setUser({...user, books: updatedBooks})
  }

  function handleDeleteBook(deletedBook) {
    console.log(deletedBook)
    const updatedBooks = user.books.filter(book => book.id != deletedBook.id)

    console.log(updatedBooks)
    setBooks(updatedBooks)
    setUser({...user, books: updatedBooks})
  }

  function handleCompleteBook(completedBook) {
    console.log("in app", completedBook)
    const newBooks = user.books.map(book => book.id === completedBook.id ? completedBook : book)
    setUser({...user, books: newBooks})
    console.log(user)
  }

  function handleAddCharacter(currentBook, newCharacter) {
    console.log("in app", newCharacter)
    const updatedCharacters = [...currentBook.characters, newCharacter]
    const updatedBook = {...currentBook, characters: updatedCharacters}
    const updatedBooks = user.books.map(book => book.id === currentBook.id ? updatedBook : book)
    const updatedUser = ({...user, books: updatedBooks})
    setUser(updatedUser)

  }

  function handleDeleteCharacter(currentBook, deletedCharacter) {
    const characterBook = user.books.find(book => book.id === currentBook.id)
    const updatedCharacters = characterBook.characters.filter(char => char.id != deletedCharacter.id)
    const updatedBook = {...currentBook, characters: updatedCharacters}
    const updatedBooks = user.books.map(book => book.id === currentBook.id ? updatedBook : book)
    const updatedUser = ({...user, books: updatedBooks})
    setUser(updatedUser)
  }

  function handleUpdateCharacter(currentBook, charInfoObj) {
    console.log("inapp", charInfoObj)
    const characterBook = user.books.find(book => book.id === currentBook.id)
    const currentCharacter = characterBook.characters.find(char => char.id === charInfoObj.id)
    const updatedCharacter = {...currentCharacter, [charInfoObj.element]: charInfoObj.value}
    const updatedCharacterList = characterBook.characters.map(char => char.id === updatedCharacter.id ? updatedCharacter : char)
    const updatedBook = {...characterBook, characters: updatedCharacterList}
    const updatedBooks = user.books.map(book => book.id === currentBook.id ? updatedBook : book)
    const updatedUser = ({...user, books: updatedBooks})
    setUser(updatedUser)
    console.log("in app after updating user", updatedUser)
  }

  return (
    <div className="App">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/logout">Logout</NavLink>
      <NavLink to="/books">My Books</NavLink>

      <Routes>
        <Route path="/" element={<Home onDeleteBook={handleDeleteBook} />} />
        <Route path="/login" element={<Login onAddBooks={handleFetchBooks} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/books" element={<BookList onDeleteBook={handleDeleteBook} onCompleteBook={handleCompleteBook} />} />
        <Route path="/books/new" element={<AddBook onAddBook={handleAddBook} />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/books/:id/characters/:id" element={<CharacterPage onDeleteCharacter={handleDeleteCharacter} onUpdateCharacter={handleUpdateCharacter}/>} />
        <Route path="/books/:id/characters/new" element={<AddCharacter onAddCharacter={handleAddCharacter} />} />
        <Route path="/books/:id/characters/:id/edit" element={<EditCharacter />} />

      </Routes>
    </div>
  );
}

export default App;
