
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const prefersDark = storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)

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
      className={`theme-toggle ${isDark ? "active" : ""}`}
    >
      <div className="theme-toggle-circle">
        {isDark ? (
          <Moon className="theme-toggle-icon" />
        ) : (
          <Sun className="theme-toggle-icon" />
        )}
      </div>
      <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-white/90 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`}>
        DAY MODE
      </span>
      <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-white/90 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}>
        NIGHT MODE
      </span>
    </button>
  )
}
