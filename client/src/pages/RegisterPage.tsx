import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select"
import { useTheme } from "../context/ThemeContext"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [university, setUniversity] = useState("Fanshawe College")
  const [error, setError] = useState("")
  const { setThemeByEmailAndSchool } = useTheme()
  const navigate = useNavigate()

  // Backend URL depending on environment
  const backendUrl =
    import.meta.env.MODE === "production"
      ? "http://unimarket-server:5000"
      : "http://localhost:5000"

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${backendUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password, university }),
      })
      if (!res.ok) throw new Error("Registration failed")
      const data = await res.json()
      localStorage.setItem("token", data.token)
      localStorage.setItem(
        "userData",
        JSON.stringify({ username: email, university })
      )
      setThemeByEmailAndSchool(email, university)
      navigate("/") // redirect to main page
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Card className="w-full max-w-md shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-lg text-primary">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Select onValueChange={(val) => setUniversity(val)} defaultValue={university}>
                <SelectTrigger id="university">
                  <SelectValue placeholder="Select University" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fanshawe College">Fanshawe College</SelectItem>
                  <SelectItem value="Western University">Western University</SelectItem>
                  <SelectItem value="Waterloo">Waterloo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full bg-primary text-accent">
              Register
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
