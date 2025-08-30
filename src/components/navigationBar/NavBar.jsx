/* import React from 'react'
import navLogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.jpg'
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='navbar'>
      <img src={navLogo} alt="" className="nav-logo" />
      <img src={navProfile} alt="" className="nav-profile" />
      
    </div>
  )
}

export default NavBar
 */
import React, { useState, useRef, useEffect } from 'react'
//import navLogo from '../../assets/nav-logo.svg'
import './NavBar.css'

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

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="navbar">
      {/* App Logo */}
     {/*  <img src={navLogo} alt="Logo" className="nav-logo" /> */}

      {/* Avatar + Dropdown */}
      <div className="nav-profile-container" ref={menuRef}>
        <button className="nav-profile-btn" onClick={() => setOpen(!open)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            width="40"
            height="40"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          </svg>
        </button>

        {open && (
          <div className="dropdown-menu">
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <li className="logout">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
