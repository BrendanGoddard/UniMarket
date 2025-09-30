// src/App.tsx
import React from "react"
import { Routes, Route } from "react-router-dom"
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import TestPage from "./pages/TestPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  )
}
