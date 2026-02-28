import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section brand">
          <h2>Retseplar Dunyosi</h2>
          <p>
            Eng mazali va oson retseptlar platformasi. 
            Har kuni yangi taomlar va foydali maslahatlar.
          </p>
        </div>

        <div className="footer-section">
          <h3>Bo'limlar</h3>
          <ul>
            <li><a href="#">Milliy taomlar</a></li>
            <li><a href="#">Fast foodlar</a></li>
            <li><a href="#">Shirinliklar</a></li>
            <li><a href="#">Salatlar</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Foydali Havolalar</h3>
          <ul>
            <li><a href="#">Biz haqimizda</a></li>
            <li><a href="#">Bog'lanish</a></li>
            <li><a href="#">Maxfiylik siyosati</a></li>
            <li><a href="#">Foydalanish shartlari</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Aloqa</h3>
          <p>Email: retseplardunyosi@gmail.com</p>
          <p>Telefon: +998 90 123 45 67</p>
          <div className="socials">
            <span>Instagram</span>
            <span>Telegram</span>
            <span>YouTube</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Retseplar Dunyosi | Created by Shahriyor & Azizbek
        </p>
      </div>
    </footer>
  );
};

export default Footer;