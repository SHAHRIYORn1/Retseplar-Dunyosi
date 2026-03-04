import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleProtectedNavigation = (e, path) => {
    e.preventDefault();
    closeMenu();
    if (user) {
      navigate(path);
    } else {
      alert(t("auth_error"));
      navigate("/login");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu} className="logo-link">
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <span className="brand-name">{t("brand")}</span>
          </Link>
        </div>

        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" onClick={closeMenu}>{t("home")}</Link>
            </li>

            <li className="nav-item dropdown">
              <Link to="/all-recipes" className="dropbtn" onClick={closeMenu}>
                {t("all_recipes")} ▾
              </Link>
              <div className="dropdown-content">
                <Link to="/all-recipes?cat=Milliy Taomlar" onClick={closeMenu}>{t("cat_national")}</Link>
                <Link to="/all-recipes?cat=FastFood" onClick={closeMenu}>{t("cat_fastfood")}</Link>
                <Link to="/all-recipes?cat=Salatlar" onClick={closeMenu}>{t("cat_salads")}</Link>
                <Link to="/all-recipes?cat=Shirinliklar" onClick={closeMenu}>{t("cat_sweets")}</Link>
              </div>
            </li>

            <li className="nav-item">
              <a href="/favorites" onClick={(e) => handleProtectedNavigation(e, "/favorites")}>{t("favorites")}</a>
            </li>
            <li className="nav-item">
              <a href="/add-recipe" onClick={(e) => handleProtectedNavigation(e, "/add-recipe")}>{t("add_recipe")}</a>
            </li>
          </ul>
        </nav>

        <div className="user-actions">
          {/* UCHTA TIL TUGMASI */}
          <div className="lang-switcher">
            <button onClick={() => changeLanguage("uz")} className={i18n.language === 'uz' ? 'active-lang' : ''}>UZ</button>
            <button onClick={() => changeLanguage("ru")} className={i18n.language === 'ru' ? 'active-lang' : ''}>RU</button>
            <button onClick={() => changeLanguage("en")} className={i18n.language === 'en' ? 'active-lang' : ''}>EN</button>
          </div>

          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="profile-link" onClick={closeMenu}>
                <div className="avatar">
                  {user.avatar ? <img src={user.avatar} className="nav-avatar-img" alt="U" /> : user.username.charAt(0).toUpperCase()}
                </div>
              </Link>
              <button className="logout-btn" onClick={logout}>{t("logout")}</button>
            </div>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              <button className="login-btn">{t("login")}</button>
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