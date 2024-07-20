import { useState } from 'react';
import '../App.css';
import { UserContext } from "./UserContext"

function App() {
  const [formData, setFormData]  = useState({username: "", password: ""})
  const [errors, setErrors] = useState([])

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
        console.log((Array.from(resp.headers.entries().filter(h => h[0] === "token"))))
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

  return (
    <div className="App">
      <h1>sign in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder='Username'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
