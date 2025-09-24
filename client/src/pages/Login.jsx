import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Button } from '../components/ui/Button'


export default function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const { setThemeByEmailAndSchool } = useTheme()
const navigate = useNavigate()


const handle = async (e) => {
e.preventDefault()
try{
// replace with your backend URL
const res = await fetch('/api/login', {
method: 'POST',
headers: {'Content-Type':'application/json'},
body: JSON.stringify({ username: email, password })
})
if (!res.ok) throw new Error('Invalid creds')
const data = await res.json()
localStorage.setItem('token', data.token)
// set theme by email
setThemeByEmailAndSchool(email, data.university)
navigate('/')
}catch(err){
setError(err.message)
}
}


return (
<div className="page form-page">
<h1 className="title">Login</h1>
<form onSubmit={handle} className="card form-card">
<label>Email
<input value={email} onChange={e=>setEmail(e.target.value)} required className="input" />
</label>
<label>Password
<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="input" />
</label>
{error && <div className="error">{error}</div>}
<Button type="submit">Login</Button>
</form>
</div>
)
}