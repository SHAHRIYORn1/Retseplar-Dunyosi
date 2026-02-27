import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">
          Dunyoning eng mazali retseptlari bir joyda
        </h2>
        <p className="hero-subtitle">
          O'zingizga yoqqan taomlarni toping, saqlang va pishiring.
        </p>
        <div className="search-bar">
          <input type="text" placeholder="Retsept qidirish... (masalan: Osh)" />
          <button className="search-btn">Qidirish</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
