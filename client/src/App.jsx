import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Preferences from './pages/Preferences'
import Login from './pages/Login'
import Register from './pages/Register'
import { useTheme } from './context/ThemeContext'


export default function App(){
const { themeName, logout } = useTheme()


return (
<div className={`app-root theme-${themeName}`}>
<nav className="nav">
<Link to="/">Home</Link>
<Link to="/preferences">Preferences</Link>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
<button onClick={logout} className="link-button">Logout</button>
</nav>


<main className="container">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/preferences" element={<Preferences />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
</Routes>
</main>
</div>
)
}