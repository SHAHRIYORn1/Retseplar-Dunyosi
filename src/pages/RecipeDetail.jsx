// src/pages/RecipeDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css"; 
import oshImg from "../assets/osh.jpg";
import shashlik from "../assets/shashlik.jpg";
import somsa from "../assets/somsa.png";
const RecipeDetail = () => {
  const { id } = useParams();

  // 1. Ma'lumotlar bazasi (ID'lar mos kelishi kerak)
  const recipes = {
    "1": { // Id 1 bo'lsa
      title: "Toshkent Palovi",
      description: "Mazali, to'yimli va haqiqiy o'zbekcha palov retsepti.",
      image: oshImg,
      time: "120 daqiqa",
      servings: "6 portsiya",
      difficulty: "O'rtacha",
      ingredients: ["1 kg guruch", "1 kg go'sht", "1 kg sabzi"],
      steps: ["Go'shtni to'g'rang", "Sabzini qovuring", "Guruchni soling"]
    },
    "2": { // Id 2 bo'lsa
      title: "Qiyma Shashlik",
      description: "Ochiq olovda pishgan mazali qiyma shashlik.",
      image: shashlik,
      time: "30 daqiqa",
      servings: "4 portsiya",
      difficulty: "Oddiy",
      ingredients: ["1 kg go'sht", "Piyoz", "Ziravorlar"],
      steps: ["Go'shtni qiymadan o'tkazing", "Ziravorlar soling"]
    }
    // Id 3 uchun somsa...
  };

  const recipe = recipes[id];

  if (!recipe) {
    return <h1 style={{textAlign: "center", marginTop: "50px"}}>Taom topilmadi</h1>;
  }

  // 2. Dizayn komponentlari (Zira.uz rejasi asosida)
  return (
    <div className="recipe-detail-container">
      {/* Sarlavha  */}
      <div className="detail-header">
        <h1>{recipe.title}</h1>
        <p className="description">{recipe.description}</p>
      </div>

      {/* Rasm va umumiy ma'lumotlar [cite: 3, 5, 6] */}
      <div className="detail-info-grid">
        <img src={recipe.image} alt={recipe.title} className="main-image" />
        
        <div className="meta-box">
          <p>🕒 Tayyorlash vaqti: {recipe.time}</p>
          <p>🍽️ Portsiya: {recipe.servings}</p>
          <p>🧑‍🍳 Qiyinchilik: {recipe.difficulty}</p>
        </div>
      </div>

      {/* Masalliqlar qismi [cite: 6] */}
      <div className="info-box">
        <h2>Masalliqlar:</h2>
        <ul>
          {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>

      {/* Tayyorlanishi [cite: 6] */}
      <div className="info-box">
        <h2>Tayyorlanishi:</h2>
        {recipe.steps.map((step, index) => <p key={index}>{index + 1}. {step}</p>)}
      </div>
    </div>
  );
};

export default RecipeDetail;