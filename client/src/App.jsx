import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const API_URL = "http://localhost:5000/api";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const res = await axios.post(`${API_URL}/register`, { username, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setMessage(`Registered as ${res.data.username}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error registering");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setMessage(`Logged in as ${res.data.username}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error logging in");
    }
  };

  const getProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(`You are logged in as ${res.data.username}`);
    } catch {
      setMessage("Not authorized");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMessage("Logged out");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">UniMarket Auth Demo</h1>
        <CardContent>
          <input
            className="p-2 border rounded w-full"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="p-2 border rounded w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={register} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Register
            </Button>
            <Button onClick={login} className="flex-1 bg-green-600 hover:bg-green-700">
              Login
            </Button>
            <Button onClick={logout} className="flex-1 bg-red-600 hover:bg-red-700">
              Logout
            </Button>
          </div>
          {token && (
            <Button
              onClick={getProfile}
              className="w-full mt-2 bg-purple-600 hover:bg-purple-700"
            >
              Get Profile
            </Button>
          )}
          {message && <p className="mt-4 font-mono text-sm text-center">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
