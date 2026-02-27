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
          <li className="nav-item">
            <a href="/kategoriyalar">Kategoriyalar</a>
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
