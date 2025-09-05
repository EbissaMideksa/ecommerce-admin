import React, { useState, useRef, useEffect } from "react"
import "./NavBar.css"

const NavBar = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="navbar">
      <div className="nav-profile-container" ref={menuRef}>
        <button
          className="nav-profile-btn"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {/* Avatar SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="nav-profile-icon"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          </svg>

          {/* Dropdown Arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="nav-dropdown-arrow"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div className={`dropdown-menu ${open ? "show" : ""}`}>
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li className="logout">Logout</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar
