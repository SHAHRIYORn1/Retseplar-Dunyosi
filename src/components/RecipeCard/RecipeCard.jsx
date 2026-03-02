import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./RecipeCard.css";
import LoveIcon from "../../assets/love-icon.png";
import { useFavorites } from "../../context/useFavorites";

const RecipeCard = ({ taom }) => {
  // favorites ro'yxatini ham olamiz
  const { toggleFavorite, favorites } = useFavorites();

  // Taom sevimlilar ro'yxatida borligini tekshirish
  const isFavorite = favorites.some((fav) => fav.id === taom?.id);

  let imageUrl = LoveIcon;
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
            {/* Dinamik klass qo'shildi: isFavorite bo'lsa active-like qo'shiladi */}
            <button 
              className={`love-btn ${isFavorite ? "active-like" : ""}`} 
              onClick={() => toggleFavorite(taom)}
            >
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