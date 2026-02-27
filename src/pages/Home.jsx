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
    <div className="page-container">
      <Navbar />
      <Hero />
      <main style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Eng ommabop retseptlar
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "25px",
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
