import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { Card } from '../components/ui/Card'


export default function Preferences(){
const { setThemeName } = useTheme()
return (
<div className="page">
<h1 className="title">Preferences</h1>
<Card>
<div className="grid grid-cols-1 gap-3">
<button onClick={()=>setThemeName('fanshawe')} className="link-btn">Set Fanshawe (red)</button>
<button onClick={()=>setThemeName('western')} className="link-btn">Set Western (purple)</button>
<button onClick={()=>setThemeName('waterloo')} className="link-btn">Set Waterloo (gold)</button>
</div>
</Card>
</div>
)
}