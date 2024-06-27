import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/poki1.png'; // Adjust the path based on your project structure
import './navbar.css'; // Import your custom CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/favorite">Favorite</NavLink>
        </li>
        <li className="nav-item logo-item">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="Logo" style={{ maxWidth: '50px' }} /> 
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/game">Game</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
