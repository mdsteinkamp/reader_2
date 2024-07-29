import { useEffect, useState, useContext } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom'
import { UserContext } from './UserContext';
import '../App.css';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import AddBook from './AddBook';
import BookList from './BookList';

function App() {
  // const [formData, setFormData]  = useState({username: "", password: ""})
  // const [errors, setErrors] = useState([])
  // const [token, setToken] = useState(localStorage.getItem("jwt"))
  const {user, setUser} = useContext(UserContext)
  const [books, setBooks] = useState([])

  console.log(user)

  

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

  console.log(books)


  return (
    <div className="App">
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/logout">Logout</NavLink>
      <NavLink to="/books">My Books</NavLink>

      <Routes>
        <Route path="/" element={<Home onDeleteBook={handleDeleteBook}/>} />
        <Route path="/login" element={<Login onAddBooks={handleFetchBooks}/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/books" element={<BookList onDeleteBook={handleDeleteBook}/>} />
        <Route path="/books/new" element={<AddBook onAddBook={handleAddBook}/>} />
      </Routes>
    </div>
  );
}

export default App;
