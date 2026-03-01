// src/components/RecipeCard/RecipeCard.jsx
import React from "react";
import { Link } from "react-router-dom"; // Link'ni import qilamiz
import Button from "../Button/Button";
import "./RecipeCard.css";
import LoveIcon from "../../assets/love-icon.png";
import { useFavorites } from "../../context/FavoritesContext";

// props'ga 'id' qo'shdik
const RecipeCard = ({ id, title, description, imageUrl, time }) => { 
  const { toggleFavorite } = useFavorites();
  
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
              className="love-btn" 
              onClick={() => toggleFavorite({ title, description, imageUrl, time })}
            >
              <img src={LoveIcon} alt="Love icon" className="love-icon"/>
            </button>   
            
            {/* LINK YO'LI: ID bo'yicha dinamik yo'naltirish */}
            <Link to={`/recipe/${id}`} style={{ textDecoration: 'none' }}>
                <Button variant="secondary">Ko'rish</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;