import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useTheme } from "../context/ThemeContext"

export default function MainPage() {
  const navigate = useNavigate()
  const { logout } = useTheme()
  const userData = localStorage.getItem("userData")
  const user = userData ? JSON.parse(userData) : null

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-primary text-accent">
        <h1 className="text-2xl font-bold">UniMarket By MMEBJ</h1>
        {user ? (
          <div className="flex items-center gap-2">
            <p className="text-sm">{user.username}</p>
            <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/") }}>
              Logout
            </Button>
          </div>
        ) : null}
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-4">
        {!user ? (
          <>
            <h2 className="text-3xl font-bold text-primary">Welcome to UniMarket</h2>
            <p className="text-muted-foreground max-w-md">
              UniMarket is your campus marketplace to buy and sell textbooks, electronics,
              clothing, and more. Join your university community and start trading today!
            </p>
            <Card className="w-full max-w-sm shadow-md rounded-2xl mt-4">
              <CardHeader>
                <CardTitle className="text-center text-lg">Get Started</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button onClick={() => navigate("/login")} className="w-full bg-primary text-accent">
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="w-full bg-accent text-primary border border-primary"
                >
                  Register
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Hello, {user.username}!</h2>
            <p className="text-muted-foreground">
              Your university: <span className="font-semibold">{user.university}</span>
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
