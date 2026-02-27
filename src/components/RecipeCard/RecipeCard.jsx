import React from "react";
import Button from "../Button/Button";
import "./RecipeCard.css";

const RecipeCard = ({ title, description, imageUrl, time }) => {
  return (
    <div className="recipe-card">
      <img src={imageUrl} alt={title} className="recipe-image" />
      <div className="recipe-content">
        <h3 className="recipe-title">{title}</h3>
        <p className="recipe-description">{description}</p>
        <div className="recipe-footer">
          <span className="recipe-time">🕒 {time}</span>

          <Button variant="secondary">Ko'rish</Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
