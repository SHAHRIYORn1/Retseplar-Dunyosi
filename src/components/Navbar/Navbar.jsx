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

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem("isAdmin");
    closeMenu();
    navigate("/login");
  };

  const handleProtectedNavigation = (e, path) => {
    e.preventDefault();
    closeMenu();
    if (user) {
      navigate(path);
    } else {
      alert(t("auth_error") || "Tizimga kiring!");
      navigate("/login");
    }
  };

  const getInitial = () => {
    if (!user) return "";
    const name = user.username || user.fullName || "Admin";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* BRAND */}
        <div className="navbar-brand">
          <Link to="/" onClick={closeMenu} className="logo-link">
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <span className="brand-name">{t("brand")}</span>
          </Link>
        </div>

        {/* NAV MENU */}
        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" onClick={closeMenu}>{t("home")}</Link>
            </li>

            {/* BARCHA RETSEPTLAR + NESTED DROPDOWN */}
            <li className="nav-item dropdown">
              <Link to="/all-recipes" className="dropbtn">
                {t("all_recipes")} ▾
              </Link>
              <ul className="dropdown-content">
                {/* Milliy Taomlar */}
                <li className="has-submenu">
                  <Link to="/all-recipes?cat=Milliy Taomlar">{t("cat_national")} <span className="arrow">▸</span></Link>
                  <ul className="submenu">
                    <li><Link to="/all-recipes?sub=Suyuq" onClick={closeMenu}>Suyuq taomlar</Link></li>
                    <li><Link to="/all-recipes?sub=Quyuq" onClick={closeMenu}>Quyuq taomlar</Link></li>
                    <li><Link to="/all-recipes?sub=Semirish uchun" onClick={closeMenu}>Semirish uchun</Link></li>
                    <li><Link to="/all-recipes?sub=Ozish uchun" onClick={closeMenu}>Ozish uchun</Link></li>
                  </ul>
                </li>

                {/* Fast Food */}
                <li className="has-submenu">
                  <Link to="/all-recipes?cat=FastFood">{t("cat_fastfood")} <span className="arrow">▸</span></Link>
                  <ul className="submenu">
                    <li><Link to="/all-recipes?sub=Mayonezsiz" onClick={closeMenu}>Mayonezsiz</Link></li>
                    <li><Link to="/all-recipes?sub=Burgerlar" onClick={closeMenu}>Burgerlar</Link></li>
                    <li><Link to="/all-recipes?sub=Pitsalar" onClick={closeMenu}>Pitsalar</Link></li>
                  </ul>
                </li>

                {/* Salatlar */}
                <li className="has-submenu">
                  <Link to="/all-recipes?cat=Salatlar">{t("cat_salads")} <span className="arrow">▸</span></Link>
                  <ul className="submenu">
                    <li><Link to="/all-recipes?sub=Vitaminli" onClick={closeMenu}>Vitaminli</Link></li>
                    <li><Link to="/all-recipes?sub=Parhez" onClick={closeMenu}>Parhezbop</Link></li>
                  </ul>
                </li>

                {/* Shirinliklar */}
                <li className="has-submenu">
                  <Link to="/all-recipes?cat=Shirinliklar">{t("cat_sweets")} <span className="arrow">▸</span></Link>
                  <ul className="submenu">
                    <li><Link to="/all-recipes?sub=Pishiriqlar" onClick={closeMenu}>Pishiriqlar</Link></li>
                    <li><Link to="/all-recipes?sub=Tortlar" onClick={closeMenu}>Tortlar</Link></li>
                    <li><Link to="/all-recipes?sub=Muzqaymoq" onClick={closeMenu}>Muzqaymoqlar</Link></li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="/favorites" onClick={(e) => handleProtectedNavigation(e, "/favorites")}>{t("favorites")}</a>
            </li>
          </ul>
        </nav>

        {/* USER ACTIONS */}
        <div className="user-actions">
          <div className="lang-switcher">
            <button onClick={() => changeLanguage("uz")} className={i18n.language === 'uz' ? 'active-lang' : ''}>UZ</button>
            <button onClick={() => changeLanguage("ru")} className={i18n.language === 'ru' ? 'active-lang' : ''}>RU</button>
            <button onClick={() => changeLanguage("en")} className={i18n.language === 'en' ? 'active-lang' : ''}>EN</button>
          </div>

          {user ? (
            <div className="user-menu">
              <Link to={localStorage.getItem("isAdmin") === "true" ? "/admin" : "/profile"} className="profile-link" onClick={closeMenu}>
                <div className="avatar">
                  {user.avatar ? (
                    <img src={user.avatar} className="nav-avatar-img" alt="U" />
                  ) : (
                    <span>{getInitial()}</span>
                  )}
                </div>
              </Link>
              <button className="logout-btn" onClick={handleLogout}>{t("logout")}</button>
            </div>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              <button className="login-btn">{t("login")}</button>
            </Link>
          )}

          <button className="hamburger" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;