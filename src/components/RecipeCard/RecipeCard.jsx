import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import LoveIcon from "../../assets/love-icon.png";
import Button from "../Button/Button";
import "./RecipeCard.css";

// Assets papkasidagi barcha rasmlarni yuklash
const assetImages = import.meta.glob("../../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
});

const RecipeCard = ({ taom }) => {
  const { user } = useAuth();
  const { toggleFavorite, favorites } = useFavorites();

  const isFavorite = favorites.some(
    (fav) => String(fav.id) === String(taom?.id),
  );

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Sevimlilarga qo'shish uchun avval akkauntingizga kiring!");
      return;
    }
    toggleFavorite(taom);
  };

  const getImageUrl = () => {
    if (!taom?.imageName) return null;
    if (taom.imageName.startsWith("http")) return taom.imageName;

    const path = `../../assets/${taom.imageName}`;
    return assetImages[path] ? assetImages[path].default : null;
  };

  const finalSrc = getImageUrl();

  return (
    <div className="recipe-card">
      <div className="image-wrapper">
        <img
          src={
            finalSrc ||
            "https://via.placeholder.com/300x200?text=Rasm+Topilmadi"
          }
          alt={taom?.title}
          className="recipe-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Error";
          }}
        />
        {taom?.category && (
          <span className="category-span">{taom.category}</span>
        )}
      </div>

      <div className="recipe-content">
        <div className="recipe-header-info">
          <h3 className="recipe-title">{taom?.title || "Noma'lum"}</h3>
          {/* Qiyinchilik darajasi uchun badge */}
          <span
            className={`difficulty-badge ${taom?.difficulty?.toLowerCase().replace("'", "")}`}
          >
            {taom?.difficulty}
          </span>
        </div>

        <p className="recipe-description">
          {taom?.description
            ? taom.description.substring(0, 65) + "..."
            : "Tavsif mavjud emas"}
        </p>

        {/* Necha kishilik ekanligi haqida ma'lumot */}
        <div className="recipe-extra-meta">
          <span>👥 {taom?.servings || "—"} kishilik</span>
          <span className="sub-category-text">#{taom?.subCategory}</span>
        </div>

        <div className="recipe-footer">
          <span className="recipe-time">🕒 {taom?.time || "---"}</span>
          <div className="card-buttons-footer">
            <button
              className={`love-btn ${isFavorite ? "active-like" : ""}`}
              onClick={handleFavoriteClick}
            >
              <img src={LoveIcon} alt="Like" className="love-icon" />
            </button>
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
