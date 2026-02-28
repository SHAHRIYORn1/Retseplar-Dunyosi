import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <h1 className="brand-name">Retseplar Dunyosi</h1>
      </div>

      <nav className="nav-menu">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/">Bosh sahifa</a>
          </li>
          {/* Ochiladigan menyu qismi */}
          <li className="nav-item dropdown">
            <a href="/kategoriyalar" className="dropdown-trigger">Retseplar</a>
            <ul className="dropdown-menu">
                <li><a href="/recipe-details">Milliy taomlar</a></li>
              <li><a href="./recipe-details">Shirinliklar</a></li>
              <li><a href="./recipe-details">Fast foodlar</a></li>
              <li><a href="./recipe-details">Salatlar</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="/add-recipe">Qo'shish</a>
          </li>
        </ul>
      </nav>

      <div className="user-actions">
        <button className="login-btn">Kirish</button>
      </div>
    </header>
  );
};

export default Navbar;