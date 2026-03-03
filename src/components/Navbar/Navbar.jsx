import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleAddRecipeClick = (e) => {
    e.preventDefault();
    closeMenu();
    if (user) {
      navigate("/add-recipe");
    } else {
      alert("Retsept qo'shish uchun avval tizimga kiring!");
      navigate("/login");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* 1. BRAND (CHAPDA) */}
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu} className="logo-link">
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <span className="brand-name">Retseptlar Dunyosi</span>
          </Link>
        </div>

        {/* 2. NAV ITEMS (MARKAZDA) */}
        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" onClick={closeMenu}>Bosh sahifa</Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="/all-recipes" className="dropbtn" onClick={closeMenu}>
                Barcha Retseptlar ▾
              </Link>
              <div className="dropdown-content">
                <Link to="/all-recipes?cat=Milliy Taomlar" onClick={closeMenu}>Milliy Taomlar</Link>
                <Link to="/all-recipes?cat=FastFood" onClick={closeMenu}>FastFood</Link>
                <Link to="/all-recipes?cat=Salatlar" onClick={closeMenu}>Salatlar</Link>
                <Link to="/all-recipes?cat=Shirinliklar" onClick={closeMenu}>Shirinliklar</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/favorites" onClick={closeMenu}>Favorites</Link>
            </li>
            <li className="nav-item">
              <Link to="/add-recipe" onClick={handleAddRecipeClick}>Qo'shish</Link>
            </li>
          </ul>
        </nav>

        {/* 3. USER ACTIONS (O'NGDA) */}
        <div className="user-actions">
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="profile-link" onClick={closeMenu}>
                <div className="avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </Link>
              <button className="logout-btn" onClick={logout}>Chiqish</button>
            </div>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              <button className="login-btn">Kirish</button>
            </Link>
          )}
          
          <button className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;