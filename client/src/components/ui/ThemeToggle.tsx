"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const prefersDark =
      storedTheme === "dark" ||
      (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)

    setIsDark(prefersDark)
    document.documentElement.classList.toggle("dark", prefersDark)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle("dark", newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className={`theme-toggle ${isDark ? "toggle--dark" : "toggle--light"}`}
    >
      <span
        className={`toggle-label ${
          isDark ? "opacity-100 left-4" : "opacity-0"
        }`}
      >
        NIGHT MODE
      </span>
      <span
        className={`toggle-label ${
          !isDark ? "opacity-100 right-4" : "opacity-0"
        }`}
      >
        DAY MODE
      </span>

      <div className="toggle-circle">
        {isDark ? (
          <Moon className="toggle-icon" />
        ) : (
          <Sun className="toggle-icon" />
        )}
      </div>
    </button>
  )
}
