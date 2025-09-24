import React from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { useTheme } from '../context/ThemeContext'


export default function Home(){
const { themeName } = useTheme()
return (
    <div className="page">
        <h1 className="title">Welcome — Campus Themed App</h1>
        <Card>
            <CardContent>
                <p>You are currently seeing the <strong>{themeName}</strong> theme.</p>
                <p>This app will change colors automatically when you register/login with a school email or choose a university.</p>
            </CardContent>
        </Card>
    </div>
)
}