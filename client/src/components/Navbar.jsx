import { useEffect, useState } from "react"
import "../styles/navbar.css"

function Navbar() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  )

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.removeAttribute("data-theme")
      localStorage.setItem("theme", "light")
    }
  }, [dark])

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-title">
          <h3>File Manager</h3>
        </div>

        <div className="navbar-user">
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="navbar-user">
          <span>Welcome back!</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
