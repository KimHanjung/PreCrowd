import React, { useState } from "react"
import {Link, Redirect } from "react-router-dom"

function LoginForm({ authenticated, login, location }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = () => {
    try {
      login({ email, password })
      alert("email: "+ email+"  password: "+password)
    } catch (e) {
      alert("Failed to login")
      setEmail("")
      setPassword("")
    }
  }

  const { from } = location.state || { from: { pathname: "/" } }
  if (authenticated) return <Redirect to={from} />

  return (
    <>
      <h1>Login</h1>
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        placeholder="email"
      />
      <input
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type="password"
        placeholder="password"
      />
      <Link to="/admin">
      <button onClick={handleClick}>Login</button>
      </Link>
    </>
  )
}

export default LoginForm