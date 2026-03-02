import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./RecipeCard.css";
import LoveIcon from "../../assets/love-icon.png";
import { useFavorites } from "../../context/FavoritesContext";

const RecipeCard = ({ taom }) => {
  const { toggleFavorite } = useFavorites();

  // Dinamik rasm yo'li (src/assets ichidagi rasmlar uchun)
  const imageUrl = new URL(`../../assets/${taom.imageName}`, import.meta.url).href;

  return (
    <div className="recipe-card">
      <img src={imageUrl} alt={taom.title} className="recipe-image" />
      <div className="recipe-content">
        <h3 className="recipe-title">{taom.title}</h3>
        <p className="recipe-description">{taom.description}</p>
        <div className="recipe-footer">
          <span className="recipe-time">🕒 {taom.time}</span>
          <div className="card-buttons-footer">
            <button
              className="love-btn"
              onClick={() => toggleFavorite(taom)}
            >
              <img src={LoveIcon} alt="Sevimlilar" className="love-icon" />
            </button>

            <Link to={`/recipe/${taom.id}`} style={{ textDecoration: "none" }}>
              <Button variant="secondary">Ko'rish</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;