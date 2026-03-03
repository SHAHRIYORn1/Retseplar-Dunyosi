import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./RecipeCard.css";
import LoveIcon from "../../assets/love-icon.png";
import { useFavorites } from "../../context/useFavorites";

const RecipeCard = ({ taom }) => {
  const { toggleFavorite, favorites } = useFavorites();

  // Taom sevimlilar ro'yxatida borligini tekshirish
  const isFavorite = favorites.some((fav) => fav.id === taom?.id);

  // Rasm mantiqi: Agar imageName URL bo'lsa uni ishlatadi, aks holda assets papkasidan qidiradi
  let imageUrl;
  if (taom?.imageName) {
    if (taom.imageName.startsWith("http")) {
      imageUrl = taom.imageName;
    } else {
      try {
        imageUrl = new URL(`../../assets/${taom.imageName}`, import.meta.url).href;
      } catch (e) {
        imageUrl = "/default-food.png"; // Rasm topilmasa default rasm
      }
    }
  }

  return (
    <div className="recipe-card">
      <div className="image-wrapper" style={{ position: "relative" }}>
        <img
          src={imageUrl}
          alt={taom?.title || "Taom"}
          className="recipe-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Retsept+Rasmi";
          }}
        />
        
        {/* Taom kategoriyasi (Turi) uchun Span */}
        {taom?.category && (
          <span className="category-span">
            {taom.category}
          </span>
        )}
      </div>

      <div className="recipe-content">
        <h3 className="recipe-title">{taom?.title || "Noma'lum taom"}</h3>
        <p className="recipe-description">
          {taom?.description ? taom.description.substring(0, 60) + "..." : "Tavsif mavjud emas"}
        </p>

        <div className="recipe-footer">
          <span className="recipe-time">🕒 {taom?.time || "---"}</span>
          
          <div className="card-buttons-footer">
            {/* Sevimlilarga qo'shish tugmasi */}
            <button 
              className={`love-btn ${isFavorite ? "active-like" : ""}`} 
              onClick={() => toggleFavorite(taom)}
              title="Saralanganlarga qo'shish"
            >
              <img src={LoveIcon} alt="Love" className="love-icon" />
            </button>

            {/* Batafsil ko'rish tugmasi */}
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