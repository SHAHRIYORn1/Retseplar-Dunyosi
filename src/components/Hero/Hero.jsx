import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Qidiruv so'zi bilan AllRetsep sahifasiga o'tkazish
      navigate(`/all-recipes?search=${query.trim()}`);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h2 className="hero-title">
          Dunyoning eng mazali retseptlari bir joyda
        </h2>
        <p className="hero-subtitle">
          O'zingizga yoqqan taomlarni toping, saqlang va pishiring.
        </p>
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Retsept qidirish... (masalan: Osh)" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">Qidirish</button>
        </form>
      </div>
    </section>
  );
};

export default Hero;