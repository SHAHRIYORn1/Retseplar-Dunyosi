import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <h1 className="brand-name">
            <Link target="_self" to="/" onClick={closeMenu}>
              Retseplar Dunyosi
            </Link>
          </h1>
        </div>

        {/* HAMBURGER MENYU */}
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

      {/* NAV MENYU */}
      <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" onClick={closeMenu}>
              Bosh sahifa
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/all-recipes" onClick={closeMenu}>
             Barcha Retseplar
            </Link>
          </li>

          <li className="nav-item">
            <Link to="#" onClick={closeMenu}>
              Favorites
            </Link>
          </li>

          <li className="nav-item">
            <Link to="#" onClick={closeMenu}>
              Qo'shish
            </Link>
          </li>
        </ul>
      </nav>

      {/* USER ACTIONS */}
      <div className="user-actions">
        <Link to="/login" onClick={closeMenu}>
          <button className="login-btn">Kirish</button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
