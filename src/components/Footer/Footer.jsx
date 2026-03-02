import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
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

        {/* Categories Section */}
        <div className="footer-section">
          <h3>Bo'limlar</h3>
          <ul>
            <li><Link to="#">Milliy taomlar</Link></li>
            <li><Link to="#">Fast foodlar</Link></li>
            <li><Link to="#">Shirinliklar</Link></li>
            <li><Link to="#">Salatlar</Link></li>
          </ul>
        </div>

        {/* Links Section */}
        <div className="footer-section">
          <h3>Foydali Havolalar</h3>
          <ul>
            <li><Link to="#">Biz haqimizda</Link></li>
            <li><Link to="#">Bog'lanish</Link></li>
            <li><Link to="#">Maxfiylik siyosati</Link></li>
            <li><Link to="#">Foydalanish shartlari</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3>Aloqa</h3>
          <p><strong>Email:</strong> retseplardunyosi@gmail.com</p>
          <p><strong>Telefon:</strong> +998 90 123 45 67</p>
          <div className="socials">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Telegram</a>
            <a href="#" className="social-link">YouTube</a>
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