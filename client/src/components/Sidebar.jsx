import { Link, useLocation, useNavigate } from "react-router-dom"
import "../styles/sidebar.css"

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>📁 CloudoAIFiles </h2>
      </div>

      <nav className="sidebar-nav">
        {/* My Files */}
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          <span className="icon">📁</span>
          My Files
        </Link>

        {/* Upload */}
        <Link
          to="/upload"
          className={location.pathname === "/upload" ? "active" : ""}
        >
          <span className="icon">⬆️</span>
          Upload
        </Link>

        {/* Trash */}
        <Link
          to="/trash"
          className={location.pathname === "/trash" ? "active" : ""}
        >
          <span className="icon">🗑️</span>
          Trash
        </Link>

        <Link
        to="/ai-folders"
        className={location.pathname === "/ai-folders" ? "active" : ""}
        >
          <span className="icon">⚡</span>
        AI-powered Folders
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <span className="icon">🚪</span>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
