import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Button } from '../components/ui/Button'


export default function Register(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [university, setUniversity] = useState('Fanshawe College')
const [error, setError] = useState('')
const { setThemeByEmailAndSchool } = useTheme()
const navigate = useNavigate()


const handle = async (e) => {
e.preventDefault()
try{
const res = await fetch('/api/register', {
method: 'POST',
headers: {'Content-Type':'application/json'},
body: JSON.stringify({ username: email, password, university })
})
if (!res.ok) throw new Error('Registration failed')
const data = await res.json()
localStorage.setItem('token', data.token)
setThemeByEmailAndSchool(email, university)
navigate('/')
}catch(err){
setError(err.message)
}
}


return (
<div className="page form-page">
<h1 className="title">Register</h1>
<form onSubmit={handle} className="card form-card">
<label>Email
<input value={email} onChange={e=>setEmail(e.target.value)} required className="input" />
</label>
<label>Password
<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="input" />
</label>
<label>University
<select value={university} onChange={e=>setUniversity(e.target.value)} className="input">
<option>Fanshawe College</option>
<option>Western University</option>
<option>Waterloo</option>
</select>
</label>
{error && <div className="error">{error}</div>}
<Button type="submit">Register</Button>
</form>
</div>
)
}