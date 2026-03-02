import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // useAuth ni to'g'ri chaqiramiz

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <h1 className="brand-name">
            <Link target="_self" to="/" onClick={closeMenu}>
              Retseptlar Dunyosi
            </Link>
          </h1>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" onClick={closeMenu}>Bosh sahifa</Link>
          </li>
          <li className="nav-item">
            <Link to="/all-recipes" onClick={closeMenu}>Barcha Retseptlar</Link>
          </li>
          <li className="nav-item">
            <Link to="/favorites" onClick={closeMenu}>Favorites</Link>
          </li>
          <li className="nav-item">
            <Link to="#" onClick={closeMenu}>Qo'shish</Link>
          </li>
        </ul>
      </nav>

      <div className="user-actions">
        {user ? (
          <div className="user-menu">
            <div className="avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <button className="logout-btn" onClick={logout}>Chiqish</button>
          </div>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            <button className="login-btn">Kirish</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;