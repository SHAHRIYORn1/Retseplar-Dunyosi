import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  // Sahifaning eng tepasiga silliq qaytish funksiyasi
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section brand">
          <h2>Retseplar Dunyosi</h2>
          <p>
            Eng mazali va oson retseptlar platformasi. 
            Har kuni yangi taomlar va foydali maslahatlar.
          </p>
        </div>

        {/* Categories Section - ENDI ISHLAYDI */}
        <div className="footer-section">
          <h3>Bo'limlar</h3>
          <ul>
            <li>
              <Link to="/all-recipes?cat=Milliy Taomlar" onClick={scrollToTop}>
                Milliy taomlar
              </Link>
            </li>
            <li>
              <Link to="/all-recipes?cat=FastFood" onClick={scrollToTop}>
                Fast foodlar
              </Link>
            </li>
            <li>
              <Link to="/all-recipes?cat=Shirinliklar" onClick={scrollToTop}>
                Shirinliklar
              </Link>
            </li>
            <li>
              <Link to="/all-recipes?cat=Salatlar" onClick={scrollToTop}>
                Salatlar
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Section */}
        <div className="footer-section">
          <h3>Foydali Havolalar</h3>
          <ul>
            <li><Link to="/">Bosh sahifa</Link></li>
            <li><Link to="/favorites">Saralanganlar</Link></li>
            <li><Link to="#">Biz haqimizda</Link></li>
            <li><Link to="#">Maxfiylik siyosati</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>Aloqa</h3>
          <p><strong>Email:</strong> retseplardunyosi@gmail.com</p>
          <p><strong>Telefon:</strong> +998 90 123 45 67</p>
          <div className="socials">
            <a href="https://instagram.com" className="social-link" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://t.me" className="social-link" target="_blank" rel="noreferrer">Telegram</a>
            <a href="https://youtube.com" className="social-link" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>
          © 2026 Retseplar Dunyosi | Created by Shahriyor & Azizbek
        </p>
      </div>
    </footer>
  );
};

export default Footer;