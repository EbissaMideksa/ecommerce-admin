import React, { useState, useRef, useEffect } from 'react';
import navLogo from '../../assets/nav-logo.svg';
import defaultProfileIcon from '../../assets/default-profile.svg';
import './NavBar.css';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const profileImage = null; // Replace with uploaded image state if available

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <img src={navLogo} alt="Logo" className="nav-logo" />
      
      <div className="profile-container" ref={dropdownRef}>
        <img
          src={profileImage || defaultProfileIcon}
          alt="Profile"
          className="nav-profile"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {dropdownOpen && (
          <div className="dropdown-menu">
            <button>👤 Profile</button>
            <button>⚙️ Settings</button>
            <button>🚪 Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
