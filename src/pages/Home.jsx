import React from "react";
import Hero from "../components/Hero/Hero";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import Footer from "../components/Footer/Footer";
import taomlar from "../toamlar.json"; 
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  // Bu yerda aniq 4 ta elementni kesib olamiz
  // JSON faylingizda 10 ta taom bo'lsa ham, faqat dastlabki 4 tasi chiqadi
  const popularRecipes = taomlar.slice(0, 3);

  return (
    <div className="page-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <main style={{ padding: "40px 20px", flex: 1, backgroundColor: "#f9f9f9" }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2rem", color: "#333" }}>
          Eng ommabop retseptlar
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          {/* Mana bu yerda faqat 4 ta element aylanadi */}
          {popularRecipes.map((taom) => (
            <RecipeCard key={taom.id} taom={taom} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;