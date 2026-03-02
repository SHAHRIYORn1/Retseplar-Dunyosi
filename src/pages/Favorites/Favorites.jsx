// src/pages/Favorites/Favorites.jsx
import React from "react";
import styles from "./Favorites.module.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useFavorites } from "../../context/FavoritesContext";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Saralangan Retseptlar ❤️</h1>

        {favorites.length > 0 ? (
          <div className={styles.grid}>
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                // MUHIM: Bu yerda 'taom' prop'i sifatida obyektni uzatamiz
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
