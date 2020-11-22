import React, { useState } from "react"
import {Link, Redirect } from "react-router-dom"

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// set up port
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
// add routes
const router = require('../routes/router.js');
app.use('/api', router);
// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
      <h1>김한중</h1>
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