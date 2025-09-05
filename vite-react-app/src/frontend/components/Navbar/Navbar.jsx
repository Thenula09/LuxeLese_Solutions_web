import React from 'react'; 
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo">LuxeLese Solutions</span>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#signin" className="signbtn">Sign in</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;