import React from 'react'
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
