import { useEffect, useState, UseContext } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom'
import { UserContext } from './UserContext';
import '../App.css';
import Login from './Login';
import Logout from './Logout';

function App() {
  const [formData, setFormData]  = useState({username: "", password: ""})
  const [errors, setErrors] = useState([])
  const [token, setToken] = useState(localStorage.getItem("jwt"))

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
          console.log(user)
      })} else {
        resp.json().then(e => {
          setErrors(e.errors)
          console.log(errors)
        })
      }
    })
  }

  localStorage.setItem('jwt', token)
  console.log(token)
  


  return (
    <div className="App">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/logout">Logout</NavLink>

      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/logout" element={<Logout />}/>
      </Routes>
    </div>
  );
}

export default App;
