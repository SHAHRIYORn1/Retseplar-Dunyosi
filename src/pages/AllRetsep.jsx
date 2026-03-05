import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar/Navbar.jsx";
import RecipeCard from "../components/RecipeCard/RecipeCard.jsx";
import recipesData from "../taomlar.json";

const AllRecipes = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const catParam = searchParams.get("cat");
  const subParam = searchParams.get("sub");

  useEffect(() => {
    const staticRecipes = recipesData;
    const localRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    let allCombined = [...localRecipes, ...staticRecipes];

    // Filtrlash logikasi - xatoliklarni oldini olish uchun (Case-insensitive)
    if (catParam) {
      allCombined = allCombined.filter(
        (r) =>
          // Bo'sh joylarni olib tashlab va kichik harfga o'tkazib solishtiramiz
          r.category?.replace(/\s/g, "").toLowerCase() ===
          catParam.replace(/\s/g, "").toLowerCase(),
      );
    }
    if (subParam) {
      allCombined = allCombined.filter(
        (r) =>
          r.subCategory?.replace(/\s/g, "").toLowerCase() ===
          subParam.replace(/\s/g, "").toLowerCase(),
      );
    }

    setFilteredRecipes(allCombined);
  }, [catParam, subParam]);

  const getPageTitle = () => {
    if (subParam) return subParam;
    if (catParam) return catParam;
    return t("all_recipes");
  };

  return (
    <div className="all-recipes-page">
      <Navbar />
      <main
        style={{ padding: "48px 20px", maxWidth: "1280px", margin: "0 auto" }}
      >
        <h1
          style={{
            marginBottom: "30px",
            borderBottom: "2px solid #eee",
            paddingBottom: "10px",
            color: "#333",
          }}
        >
          {getPageTitle()}
        </h1>

        <div
          className="recipes-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} taom={recipe} />
            ))
          ) : (
            <div
              style={{ textAlign: "center", width: "100%", padding: "50px" }}
            >
              <h3>
                😕 {t("no_recipes_found") || "Hech qanday retsept topilmadi."}
              </h3>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllRecipes;
