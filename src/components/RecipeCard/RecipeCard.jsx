import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./RecipeCard.css";
import LoveIcon from "../../assets/love-icon.png";
import { useFavorites } from "../../context/FavoritesContext";

const RecipeCard = ({ taom }) => {
  const { toggleFavorite } = useFavorites();

  // XAVFSIZLIK: taom mavjudligini va imageName borligini tekshiramiz
  let imageUrl = LoveIcon; // Default rasm
  if (taom && taom.imageName) {
    try {
      imageUrl = new URL(`../../assets/${taom.imageName}`, import.meta.url)
        .href;
    } catch (e) {
      console.error("Rasm yo'lini yaratishda xatolik:", e);
    }
  }

  return (
    <div className="recipe-card">
      {/* imageUrl bo'sh bo'lsa ham dastur xato bermaydi */}
      <img
        src={imageUrl}
        alt={taom?.title || "Taom"}
        className="recipe-image"
      />
      <div className="recipe-content">
        <h3 className="recipe-title">{taom?.title || "Noma'lum taom"}</h3>
        <p className="recipe-description">{taom?.description || ""}</p>
        <div className="recipe-footer">
          <span className="recipe-time">🕒 {taom?.time || "---"}</span>
          <div className="card-buttons-footer">
            <button className="love-btn" onClick={() => toggleFavorite(taom)}>
              <img src={LoveIcon} alt="Sevimlilar" className="love-icon" />
            </button>

            <Link to={`/recipe/${taom?.id}`} style={{ textDecoration: "none" }}>
              <Button variant="secondary">Ko'rish</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
