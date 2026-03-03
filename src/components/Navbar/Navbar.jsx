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

  // Qo'shish tugmasi bosilganda loginni tekshirish
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
        <div className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <h1 className="brand-name">
            <Link to="/" onClick={closeMenu}>Retseptlar Dunyosi</Link>
          </h1>
        </div>

        <button className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </button>
      </div>

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
            {/* Bu yerda onClick mantiqi ishlaydi */}
            <Link to="/add-recipe" onClick={handleAddRecipeClick}>Qo'shish</Link>
          </li>
        </ul>
      </nav>

      <div className="user-actions">
        {user ? (
          <div className="user-menu">
            <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
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