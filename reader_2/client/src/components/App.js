import { useEffect, useState, UseContext, useContext } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom'
import { UserContext } from './UserContext';
import '../App.css';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';

function App() {
  // const [formData, setFormData]  = useState({username: "", password: ""})
  // const [errors, setErrors] = useState([])
  // const [token, setToken] = useState(localStorage.getItem("jwt"))
  const {user} = useContext(UserContext)

  console.log(user)




  return (
    <div className="App">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/logout">Logout</NavLink>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/logout" element={<Logout />}/>
      </Routes>
    </div>
  );
}

export default App;
