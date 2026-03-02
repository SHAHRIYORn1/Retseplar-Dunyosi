import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <h1 className="brand-name">
          {/* Sahifa yangilanib ketmasligi uchun Link ishlatamiz */}
          <Link target="_self" to="/">Retseplar Dunyosi</Link>
        </h1>
      </div>

      <nav className="nav-menu">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Bosh sahifa</Link>
          </li>
          
          <li className="nav-item">
            <Link to="/all-recipes">Retseplar</Link>
        </li>
          <li className="nav-item">
            <Link to="#">Favorites</Link>
          </li>
          
          <li className="nav-item">
            <Link to="#">Qo'shish</Link>
          </li>
        </ul>
      </nav>

      <div className="user-actions">
        <Link to="/login">
          <button className="login-btn">Kirish</button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;