import React, { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext<any>({})

const schools = {
  none: { name: "none", colors: { "--primary": "#0ea5e9", "--accent": "#ffffff", "--bg": "#f8fafc" } },
  fanshawe: { name: "fanshawe", colors: { "--primary": "#d21b2b", "--accent": "#ffffff", "--bg": "#fff" } },
  western: { name: "western", colors: { "--primary": "#4b2e83", "--accent": "#ffffff", "--bg": "#fff" } },
  waterloo: { name: "waterloo", colors: { "--primary": "#d4af37", "--accent": "#000000", "--bg": "#fff" } }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState(() => {
    try { return localStorage.getItem("themeName") || "none" } catch(e){ return "none" }
  })

  useEffect(() => {
    document.documentElement.classList.remove(...Object.keys(schools).map(k=>`theme-${k}`))
    document.documentElement.classList.add(`theme-${themeName}`)
    localStorage.setItem("themeName", themeName)
  }, [themeName])

  const setThemeByEmailAndSchool = (email: string, schoolSelection?: string) => {
    const domain = (email || "").split("@")[1] || ""
    if (domain.includes("fanshawe")) return setThemeName("fanshawe")
    if (domain.includes("western") || domain.includes("uwo")) return setThemeName("western")
    if (domain.includes("waterloo")) return setThemeName("waterloo")
    if (schoolSelection) {
      const key = schoolSelection.toLowerCase().includes("fanshawe") ? "fanshawe" :
                  schoolSelection.toLowerCase().includes("western") ? "western" :
                  schoolSelection.toLowerCase().includes("waterloo") ? "waterloo" : "none"
      return setThemeName(key)
    }
    return setThemeName("none")
  }

  const logout = () => {
    try { localStorage.removeItem("token"); localStorage.removeItem("userData") } catch(e){}
    setThemeName("none")
  }

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, setThemeByEmailAndSchool, logout }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
