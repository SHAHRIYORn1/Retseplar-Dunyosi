import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; //
import { useFavorites } from "../../context/FavoritesContext"; //
import LoveIcon from "../../assets/love-icon.png"; //
import Button from "../Button/Button"; //
import "./RecipeCard.css";

const RecipeCard = ({ taom }) => {
  const { user } = useAuth(); //
  const { toggleFavorite, favorites } = useFavorites(); //

  // Taom sevimlilar ro'yxatida borligini tekshirish
  const isFavorite = favorites.some((fav) => fav.id === taom?.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    if (!user) {
      alert("Sevimlilarga qo'shish uchun avval akkauntingizga kiring!"); //
      return;
    }
    toggleFavorite(taom); //
  };

  // Rasm mantiqi
  const imageUrl = taom?.imageName 
    ? new URL(`../../assets/${taom.imageName}`, import.meta.url).href 
    : "/default-food.png";

  return (
    <div className="recipe-card">
      <div className="image-wrapper">
        <img
          src={imageUrl}
          alt={taom?.title}
          className="recipe-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Retsept";
          }}
        />
        {/* Kategoriya belgisi */}
        {taom?.category && (
          <span className="category-span">{taom.category}</span>
        )}
      </div>

      <div className="recipe-content">
        <h3 className="recipe-title">{taom?.title || "Noma'lum"}</h3>
        <p className="recipe-description">
          {taom?.description 
            ? taom.description.substring(0, 60) + "..." 
            : "Tavsif mavjud emas"}
        </p>

        <div className="recipe-footer">
          <span className="recipe-time">🕒 {taom?.time || "---"}</span>
          
          <div className="card-buttons-footer">
            {/* Sevimlilar tugmasi */}
            <button 
              className={`love-btn ${isFavorite ? "active-like" : ""}`} 
              onClick={handleFavoriteClick}
            >
              <img src={LoveIcon} alt="Like" className="love-icon" />
            </button>

            {/* Batafsil sahifaga o'tish */}
            <Link to={`/recipe/${taom?.id}`}>
              <Button variant="secondary">Ko'rish</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;