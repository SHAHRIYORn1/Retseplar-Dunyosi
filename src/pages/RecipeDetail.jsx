import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import taomlarJSON from "../taomlar.json";
import styles from "./RecipeDetail.module.css";

// Rasmlarni dinamik yuklash
const assetImages = import.meta.glob("../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
});

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Ma'lumotlarni yig'ish
    const localRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    const allCombinedData = [...taomlarJSON, ...localRecipes];

    // 2. Taomni qidirish
    const foundRecipe = allCombinedData.find(
      (item) => String(item.id) === String(id),
    );

    setRecipe(foundRecipe);
    setLoading(false);
  }, [id]);

  // Rasm manzilini aniqlash
  const getImageUrl = () => {
    if (!recipe?.imageName) return null;
    if (recipe.imageName.startsWith("http")) return recipe.imageName;

    const path = `../assets/${recipe.imageName}`;
    return assetImages[path] ? assetImages[path].default : null;
  };

  if (loading) return <div className={styles.loading}>Yuklanmoqda...</div>;

  if (!recipe) {
    return (
      <div className={styles.notFound}>
        <h1>Taom topilmadi 😕</h1>
        <p>Qidirayotgan retseptingiz bazada mavjud emas.</p>
        <Link to="/all-recipes" className={styles.backButton}>
          Barcha retseptlarga qaytish
        </Link>
      </div>
    );
  }

  const finalSrc = getImageUrl();

  return (
    <div className={styles.recipeDetailContainer}>
      <header className={styles.detailHeader}>
        <Link to="/all-recipes" className={styles.backButton}>
          ← Orqaga qaytish
        </Link>
        <h1>{recipe.title}</h1>
        <div className={styles.badges}>
          <span className={styles.difficultyBadge}>{recipe.difficulty}</span>
          <span className={styles.categoryBadge}>{recipe.subCategory}</span>
        </div>
      </header>

      <div className={styles.detailInfoGrid}>
        <div className={styles.imageWrapper}>
          <img
            src={
              finalSrc ||
              "https://via.placeholder.com/600x400?text=Rasm+Topilmadi"
            }
            alt={recipe.title}
            className={styles.mainImage}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/600x400?text=Rasm+Xatosi";
            }}
          />
        </div>

        <div className={styles.metaBox}>
          <h3>Ma'lumotlar</h3>
          <p>
            🕒 <strong>Tayyorlanish vaqti:</strong> {recipe.time}
          </p>
          <p>
            🍽 <strong>Porsiya:</strong> {recipe.servings} kishilik
          </p>
          <p>
            📂 <strong>Asosiy Kategoriya:</strong> {recipe.category}
          </p>
          <p>
            🥗 <strong>Turi:</strong> {recipe.subCategory}
          </p>
        </div>
      </div>

      <div className={styles.recipeBody}>
        <section className={styles.infoBox}>
          <h2>Kerakli masalliqlar</h2>
          <ul className={styles.ingredientsList}>
            {recipe.ingredients?.map((item, index) => (
              <li key={index} className={styles.ingredientItem}>
                <input
                  type="checkbox"
                  id={`ing-${index}`}
                  className={styles.checkbox}
                />
                <label htmlFor={`ing-${index}`}>{item}</label>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.infoBox}>
          <h2>Tayyorlanish jarayoni</h2>
          <div className={styles.stepsContainer}>
            {recipe.steps?.map((step, index) => (
              <div key={index} className={styles.stepRow}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <p className={styles.stepText}>{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;
