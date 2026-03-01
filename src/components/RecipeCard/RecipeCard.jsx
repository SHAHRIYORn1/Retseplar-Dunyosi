import React, { useState } from "react"; // useState qo'shildi
import Button from "../Button/Button";
import "./RecipeCard.css";
import LoveIcon from "../../assets/love-icon.png";

const RecipeCard = ({ title, description, imageUrl, time }) => {
  // Like holatini saqlash uchun state
  const [isLiked, setIsLiked] = useState(false);

  // Bosilganda holatni teskarisiga o'zgartirish
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="recipe-card">
      <img src={imageUrl} alt={title} className="recipe-image" />
      <div className="recipe-content">
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-description">{description}</p>
        <div className="recipe-footer">
          <span className="recipe-time">🕒 {time}</span>
          <div className="card-buttons-footer">
            <button 
              className={`love-btn ${isLiked ? "active-like" : ""}`} 
              onClick={handleLike}
            >
              <img src={LoveIcon} alt="Love icon" className="love-icon" />
            </button>
            <Button variant="secondary">Ko'rish</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;