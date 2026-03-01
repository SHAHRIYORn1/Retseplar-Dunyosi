import React from "react";
import { useParams } from "react-router-dom";
import styles from "./RecipeDetail.module.css";

import oshImg from "../assets/osh.jpg";
import shashlik from "../assets/shashlik.jpg";
import somsaImg from "../assets/somsa.png";

const RecipeDetail = () => {
  const { id } = useParams();

  const recipes = {
    "1": {
      title: "Osh",
      description: "Toshkent oshining an’anaviy retsepti. Guruch, mol go‘shti, sabzi va piyozdan tayyorlanadi.",
      image: oshImg,
      time: "1 soat",
      servings: "2",
      difficulty: "O‘rtacha",
      ingredients: ["Guruch – 2 stakan", "Mol go‘shti – 300–400 gr", "Sabzi – 2–3 ta", "Piyoz – 1 ta", "Sariyog‘ – 100 gr", "Ziravorlar – ta’bga ko‘ra"],
      steps: ["Go‘shtni qovurish: Yog‘da go‘shtni qizarguncha qovuring.", "Piyoz va sabzi qo‘shish: Piyoz va sabzini maydalab, go‘shtga qo‘shib, yumshaguncha qovuring.", "Guruchni qo‘shish: Guruchni yuving, aralashmaga qo‘shing. Tuz va ziravorlarni soling.", "Suv qo‘shish: Guruchni to‘liq qoplaydigan darajada suv qo‘shing. Qaynatib, so‘ng olovni kamaytiring va dimlab pishiring.","Sarimsoq va tuxum qo‘shish: Dimlaganing oxirida sarimsoqni qo‘shing va tuxum bilan bezang."]
    },
    "2": {
      title: "Shashlik",
      description: "O‘zbekistonning mazali shashlik retsepti. Go‘sht, sabzi va ziravorlardan tayyorlanadi.",
      image: shashlik,
      time: "40 daqiqa",
      servings: "4",
      difficulty: "Oddiy",
      ingredients: ["Go‘sht – 500 gr", "Ziravorlar – ta’bga ko‘ra", "Sariyog‘ – 50 gr", "Tuz – ta’bga ko‘ra"],
      steps: ["Go‘shtni qovurish: Yog‘da go‘shtni qizarguncha qovuring.", "Sabzi va ziravorlarni tayyorlash: Sabzini maydalab, ziravorlarni aralashtiring.", "Shashlik tayyorlash: Go‘sht va sabzini aralashtirib, shashlik tayyorlang.", "Qovurish: Shashlikni yog‘da qovuring."]
    },
    "3": {
      title: "Somsa",
      description: "O‘zbekistonning an’anaviy somsa retsepti. Un, go‘sht va sabzidan tayyorlanadi.",
      image: somsaImg,
      time: "1 soat",
      servings: "6",
      difficulty: "O‘rtacha",
      ingredients: ["Un – 500 gr", "Go‘sht – 300 gr", "Sabzi – 2 ta", "Piyoz – 1 ta", "Sariyog‘ – 100 gr", "Tuz va ziravorlar – ta’bga ko‘ra"],
      steps: ["Xamir tayyorlash: Un, suv, tuz va yog‘ni aralashtirib, yumshoq xamir tayyorlang.", "Go‘sht va sabzini tayyorlash: Go‘shtni mayda to‘g‘rab, sabzini maydalab, piyoz bilan aralashtiring. Tuz va ziravorlarni qo‘shing.", "Somsalarni shakllantirish: Xamirni bo‘laklarga bo‘ling, har bir bo‘lakni yoyib, go‘shtli aralashmani joylashtiring va somsa shaklida yoping.", "Pishirish: Somsalarni yog‘da qovuring yoki pechda pishiring."]
    }
  };

  const recipe = recipes[id];

  if (!recipe) {
    return <h1 className={styles.notFound}>Taom topilmadi</h1>;
  }

  return (
    <div className={styles.recipeDetailContainer}>

      {/* HEADER */}
      <div className={styles.detailHeader}>
        <h1>{recipe.title}</h1>
        <p className={styles.description}>{recipe.description}</p>
      </div>

      {/* IMAGE + META */}
      <div className={styles.detailInfoGrid}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className={styles.mainImage}
        />

        <div className={styles.metaBox}>
          <p>🕒 {recipe.time}</p>
          <p>🍽 {recipe.servings} porsiya</p>
          <p>👨‍🍳 {recipe.difficulty}</p>
        </div>
      </div>

      {/* INGREDIENTS */}
      <div className={styles.infoBox}>
        <h2>Masalliqlar:</h2>
        <ul>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>
              <input type="checkbox" /> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* STEPS */}
      <div className={styles.infoBox}>
        <h2>Tayyorlanishi:</h2>
        {recipe.steps.map((step, index) => (
          <p key={index}>
            <span className={styles.stepNumber}>{index + 1}</span>
            {step}
          </p>
        ))}
      </div>

    </div>
  );
};

export default RecipeDetail;