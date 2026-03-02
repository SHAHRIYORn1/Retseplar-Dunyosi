import React from "react";
import { useParams, Link } from "react-router-dom"; // Link import qilindi
import styles from "./RecipeDetail.module.css";
import taomlar from "../toamlar.json";

const RecipeDetail = () => {
  const { id } = useParams();

  // JSON dan ID bo'yicha taomni topish
  const recipe = taomlar.find((item) => item.id === id);

  if (!recipe) {
    return (
      <div className={styles.recipeDetailContainer}>
        <h1 className={styles.notFound}>Taom topilmadi</h1>
        <Link to="/" className={styles.backButton}>Bosh sahifaga qaytish</Link>
      </div>
    );
  }

  // Rasm yo'li
  const imageUrl = new URL(`../assets/${recipe.imageName}`, import.meta.url).href;

  return (
    <div className={styles.recipeDetailContainer}>
      <div className={styles.detailHeader}>
        {/* ORQAGA QAYTISH TUGMASI SHU YERDA */}
        <Link to="/" className={styles.backButton}>
          ← Bosh sahifa
        </Link>
        
        <h1>{recipe.title}</h1>
        <p className={styles.description}>{recipe.description}</p>
      </div>

      <div className={styles.detailInfoGrid}>
        <img src={imageUrl} alt={recipe.title} className={styles.mainImage} />
        <div className={styles.metaBox}>
          <p>🕒 Tayyorlanish vaqti: {recipe.time}</p>
          <p>🍽 Porsiya: {recipe.servings} kishilik</p>
          <p>👨‍🍳 Murakkablik: {recipe.difficulty}</p>
        </div>
      </div>

      <div className={styles.infoBox}>
        <h2>Masalliqlar:</h2>
        <ul>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>
              <input type="checkbox" style={{ marginRight: "10px" }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.infoBox}>
        <h2>Tayyorlanishi:</h2>
        {recipe.steps.map((step, index) => (
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