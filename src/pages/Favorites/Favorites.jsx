// src/pages/Favorites/Favorites.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Orqaga qaytish uchun
import styles from "./Favorites.module.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useFavorites } from "../../context/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate(); // Hookni chaqiramiz

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.container}>
        {/* Orqaga qaytish tugmasi */}
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Orqaga
        </button>

        <h1 className={styles.title}>Saralangan Retseptlar ❤️</h1>

        {favorites.length > 0 ? (
          <div className={styles.grid}>
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                taom={recipe}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Hozircha hech qanday retsept saqlanmagan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;