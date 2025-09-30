// src/pages/TestPage.tsx
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/ThemeContext"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPage() {
  const { themeName, logout } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-accent">
      <Card className="w-full max-w-md bg-bg border-primary">
        <CardHeader>
          <CardTitle className="text-primary text-center">
            Test Page
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p>
            You are logged in! 🎉 <br />
            Current theme: <strong>{themeName}</strong>
          </p>
          <Button
            onClick={handleLogout}
            className="bg-primary text-accent hover:bg-primary/80"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
