import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./RecipeDetail.module.css";
import taomlarJSON from "../toamlar.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // 1. Ma'lumotlarni birlashtirish (JSON + LocalStorage)
    const localRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    const allCombinedData = [...taomlarJSON, ...localRecipes];

    // 2. ID bo'yicha qidirish
    const foundRecipe = allCombinedData.find((item) => item.id === id);
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className={styles.recipeDetailContainer}>
        <h1 className={styles.notFound}>Taom topilmadi</h1>
        <Link to="/" className={styles.backButton}>Bosh sahifaga qaytish</Link>
      </div>
    );
  }

  // Rasm mantiqi: Agar URL bo'lsa o'zini, bo'lmasa assets'dan oladi
  const getImageUrl = () => {
    if (recipe.imageName.startsWith("http")) return recipe.imageName;
    try {
      return new URL(`../../assets/${recipe.imageName}`, import.meta.url).href;
    } catch {
      return "/osh.jpg"; // Default rasm
    }
  };

  return (
    <div className={styles.recipeDetailContainer}>
      <div className={styles.detailHeader}>
        <Link to="/all-recipes" className={styles.backButton}>
          ← Orqaga qaytish
        </Link>
        <h1>{recipe.title}</h1>
        <p className={styles.description}>{recipe.description}</p>
      </div>

      <div className={styles.detailInfoGrid}>
        <img src={getImageUrl()} alt={recipe.title} className={styles.mainImage} />
        <div className={styles.metaBox}>
          <p>🕒 Tayyorlanish vaqti: {recipe.time}</p>
          <p>🍽 Porsiya: {recipe.servings} kishilik</p>
          <p>👨‍🍳 Murakkablik: {recipe.difficulty}</p>
          <p>📂 Kategoriya: {recipe.category}</p>
        </div>
      </div>

      <div className={styles.infoBox}>
        <h2>Masalliqlar:</h2>
        <ul>
          {recipe.ingredients && recipe.ingredients.map((item, index) => (
            <li key={index}>
              <input type="checkbox" style={{ marginRight: "10px" }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.infoBox}>
        <h2>Tayyorlanishi:</h2>
        {recipe.steps && recipe.steps.map((step, index) => (
          <p key={index} className={styles.stepItem}>
            <span className={styles.stepNumber}>{index + 1}</span>
            {step}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetail;