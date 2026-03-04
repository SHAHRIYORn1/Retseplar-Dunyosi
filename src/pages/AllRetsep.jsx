import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar/Navbar.jsx";
import RecipeCard from "../components/RecipeCard/RecipeCard.jsx"; // Tayyor komponentingiz
import recipesData from "../toamlar.json"; 

const AllRecipes = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const catParam = searchParams.get("cat");
  const subParam = searchParams.get("sub");

  useEffect(() => {
    let result = recipesData;
    if (catParam) result = result.filter(r => r.category === catParam);
    if (subParam) result = result.filter(r => r.subCategory === subParam);
    setFilteredRecipes(result);
  }, [catParam, subParam]);

  const getPageTitle = () => {
    if (subParam) return subParam;
    if (catParam) return catParam;
    return t("all_recipes");
  };

  return (
    <div className="all-recipes-page">
      <Navbar />
      <main style={{ padding: "48px 20px", maxWidth: "1280px", margin: "0 auto" }}>
        <h1 style={{ 
          marginBottom: "30px", 
          borderBottom: "2px solid #eee", 
          paddingBottom: "10px",
          color: "#333" 
        }}>
          {getPageTitle()}
        </h1>

        <div className="recipes-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "30px" 
        }}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              /* SIZNING TAYYOR KOMPONENTINGIZ */
              <RecipeCard key={recipe.id} taom={recipe} />
            ))
          ) : (
            <div style={{ textAlign: "center", width: "100%", padding: "50px" }}>
              <h3>😕 {t("no_recipes_found") || "Hech qanday retsept topilmadi."}</h3>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllRecipes;