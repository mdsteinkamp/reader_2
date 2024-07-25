import { useEffect, useState, useContext } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom'
import { UserContext } from './UserContext';
import '../App.css';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import AddBook from './AddBook';

function App() {
  // const [formData, setFormData]  = useState({username: "", password: ""})
  // const [errors, setErrors] = useState([])
  // const [token, setToken] = useState(localStorage.getItem("jwt"))
  const {user} = useContext(UserContext)
  const [books, setBooks] = useState([])

  console.log(user)

  function handleFetchBooks(books) {
    setBooks(books)
  }

  function handleAddBook(newBook) {
    const updatedBooks = [...books, newBook]
    setBooks(updatedBooks)
  }

  function handleDeleteBook(deletedBook) {
    const updatedBooks = books.filter(book => book.id != deletedBook.id)

    console.log(updatedBooks)
    setBooks(updatedBooks)
  }

  console.log(books)


  return (
    <div className="App">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/logout">Logout</NavLink>

      <Routes>
        <Route path="/" element={<Home books={books} onDeleteBook={handleDeleteBook}/>} />
        <Route path="/login" element={<Login onAddBooks={handleFetchBooks}/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/books/new" element={<AddBook books={books} onAddBook={handleAddBook}/>} />
      </Routes>
    </div>
  );
}

export default App;
