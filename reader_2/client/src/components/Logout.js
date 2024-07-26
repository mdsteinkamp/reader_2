import { useState, useContext } from "react"
import { UserContext } from "./UserContext"

export default function Logout() {
    const [formData, setFormData]  = useState({username: "", password: ""})
    const {user, setUser} = useContext(UserContext)
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
    
      function handleLogout() {
        console.log("logging out")
        fetch("/api/logout/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
          })
          .then(resp => resp.json())
          .then(setUser(null))
      }

    return (
        <div>
            <h1>log out</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>

    )
}