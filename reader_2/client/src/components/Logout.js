import { useState } from "react"

export default function Logout() {
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
      }

    return (
        <div>
            <h1>log out</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>

    )
}