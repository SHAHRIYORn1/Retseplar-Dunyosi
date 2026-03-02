// src/pages/Favorites/Favorites.jsx
import React from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from "./Favorites.module.css";

// Vaqtinchalik saqlangan taomlar (keyinchalik buni Context'dan olamiz)
const favoriteRecipes = [
  {
    id: 1,
    title: "Toshkent Palovi",
    description: "Sarimsoq va noxat qo'shilgan haqiqiy to'y oshi.",
    imageUrl:
      "https://img.freepik.com/free-photo/uzbek-pilaf-traditional-cuisine_127032-132.jpg",
    time: "120 daqiqa",
  },
];

const Favorites = () => {
  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.title}>Saralangan Retseptlar</h1>

      {favoriteRecipes.length > 0 ? (
        <div className={styles.grid}>
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Hozircha hech qanday retsept saqlanmagan. ❤️ belgisini bosing!</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
