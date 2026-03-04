import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import taomlarJSON from "../toamlar.json";
import styles from "./RecipeDetail.module.css";

// Rasmlarni dinamik yuklash
const assetImages = import.meta.glob("../assets/*.{png,jpg,jpeg,webp}", { eager: true });

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // LocalStorage va JSON ma'lumotlarini birlashtirish
    const localRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    const allCombinedData = [...taomlarJSON, ...localRecipes];
    const foundRecipe = allCombinedData.find((item) => String(item.id) === String(id));
    setRecipe(foundRecipe);
  }, [id]);

  // Agar taom topilmasa
  if (!recipe) {
    return (
      <div className={styles.notFound}>
        <h1>Taom topilmadi</h1>
        <Link to="/" className={styles.backButton}>Orqaga qaytish</Link>
      </div>
    );
  }

  // Rasm manzilini aniqlash funksiyasi
  const getImageUrl = () => {
    if (!recipe.imageName) return null;
    if (recipe.imageName.startsWith("http")) return recipe.imageName;
    const path = `../assets/${recipe.imageName}`;
    return assetImages[path] ? assetImages[path].default : null;
  };

  const finalSrc = getImageUrl();

  return (
    <div className={styles.recipeDetailContainer}>
      {/* Header qismi */}
      <header className={styles.detailHeader}>
        <Link to="/all-recipes" className={styles.backButton}>
          ← Orqaga qaytish
        </Link>
        <h1>{recipe.title}</h1>
        <p className={styles.description}>
          Ushbu ajoyib taomning tayyorlanish jarayoni va kerakli masalliqlar bilan tanishing.
        </p>
      </header>

      {/* Rasm va Meta ma'lumotlar */}
      <div className={styles.detailInfoGrid}>
        <img 
          src={finalSrc || "https://via.placeholder.com/600x400?text=Rasm+Topilmadi"} 
          alt={recipe.title} 
          className={styles.mainImage}
        />
        
        <div className={styles.metaBox}>
          <p>🕒 <strong>Vaqt:</strong> {recipe.time}</p>
          <p>🍽 <strong>Porsiya:</strong> {recipe.servings} kishilik</p>
          <p>📂 <strong>Kategoriya:</strong> {recipe.category}</p>
        </div>
      </div>

      {/* Masalliqlar bo'limi */}
      <section className={styles.infoBox}>
        <h2>Masalliqlar</h2>
        <ul>
          {recipe.ingredients?.map((item, index) => (
            <li key={index}>
              <input type="checkbox" id={`ing-${index}`} />
              <label htmlFor={`ing-${index}`}>{item}</label>
            </li>
          ))}
        </ul>
      </section>

      {/* Tayyorlanish bosqichlari bo'limi */}
      <section className={styles.infoBox}>
        <h2>Tayyorlanish bosqichlari</h2>
        {recipe.steps?.map((step, index) => (
          <p key={index}>
            <span className={styles.stepNumber}>{index + 1}</span>
            {step}
          </p>
        ))}
      </section>
    </div>
  );
};

export default RecipeDetail;