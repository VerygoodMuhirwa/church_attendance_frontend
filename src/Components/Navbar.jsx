import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate= useNavigate()
  const handleLogout = async () => {
    localStorage.removeItem("token")
    navigate("/");
}

  return (
    <div className='navbar-container'>
      <Link to="/users">home</Link>
          <Link to="/attendance">attendancies</Link>
      <Link to="/report">reports</Link>
      <Link to="/help">help</Link>
<a href="" onClick={handleLogout}> logout</a>
    </div>
  )
}

export default Navbar
