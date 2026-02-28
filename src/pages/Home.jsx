// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import Footer from "../components/Footer/Footer";

import oshImage from "../assets/osh.jpg";
import shashlikImage from "../assets/shashlik.jpg";

const Home = () => {
  const recipes = [
    {
      id: 1,
      title: "Toshkent Palovi",
      description: "Sarimsoq va noxat qo'shilgan haqiqiy to'y oshi.",
      imageUrl: oshImage,
      time: "120 daqiqa",
    },
    {
      id: 2,
      title: "Qiyma Shashlik",
      description: "Ochiq olovda pishgan mazali qiyma shashlik.",
      imageUrl: shashlikImage,
      time: "30 daqiqa",
    },
  ];

  return (
    <div
      className="page-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <Hero />
      <main
        style={{ padding: "40px 20px", flex: 1, backgroundColor: "#f9f9f9" }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "2rem",
            color: "#333",
          }}
        >
          Eng ommabop retseptlar
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
