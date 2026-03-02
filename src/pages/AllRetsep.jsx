import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero"; // Hero import qilindi
import RecipeCard from "../components/RecipeCard/RecipeCard";
import Footer from "../components/Footer/Footer";
import taomlar from "../toamlar.json"; 

const AllRetsep = () => {
    return (  
        // Sahifa konteyneri: flexbox orqali footer-ni pastga tushiramiz
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            
            {/* Hero komponenti qo'shildi */}
            <Hero />
            
            {/* Asosiy kontent qismi */}
            <main style={{ padding: "40px 20px", flex: 1, backgroundColor: "#f9f9f9" }}>
                
                {/* H1 sarlavha */}
                <h2 style={{ 
                    textAlign: "center", 
                    marginBottom: "40px", 
                    fontSize: "2.5rem", 
                    color: "#333",
                    fontWeight: "bold"
                }}>
                    Barcha Retseptlar
                </h2>

                {/* Card-lar uchun grid konteyner */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "30px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}>
                    {/* Hamma taomlarni chiqarish */}
                    {taomlar.map((taom) => (
                        <RecipeCard key={taom.id} taom={taom} />
                    ))}
                </div>
            </main>
            
            <Footer />
        </div>
    )
}

export default AllRetsep;