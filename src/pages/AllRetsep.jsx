import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import Footer from "../components/Footer/Footer";
import taomlarJSON from "../toamlar.json"; 

const AllRetsep = () => {
    const [filteredData, setFilteredData] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // 1. JSON va LocalStorage ma'lumotlarini birlashtirish
        const localRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
        const allCombinedData = [...taomlarJSON, ...localRecipes];

        // 2. Qidiruv va Filtr mantiqi
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("search")?.toLowerCase() || "";
        const catQuery = params.get("cat") || "";

        let results = allCombinedData;

        if (searchQuery) {
            results = results.filter(taom => 
                taom.title.toLowerCase().includes(searchQuery) || 
                taom.category?.toLowerCase().includes(searchQuery)
            );
        }

        if (catQuery) {
            results = results.filter(taom => taom.category === catQuery);
        }

        setFilteredData(results);
    }, [location.search]);

    return (  
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ padding: "40px 20px", flex: 1, backgroundColor: "#f9f9f9" }}>
                <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2rem", color: "#333" }}>
                    {new URLSearchParams(location.search).get("cat") || "Barcha Retseptlar"}
                </h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "30px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}>
                    {filteredData.length > 0 ? (
                        filteredData.map((taom) => <RecipeCard key={taom.id} taom={taom} />)
                    ) : (
                        <p style={{ textAlign: "center", gridColumn: "1/-1" }}>Hech narsa topilmadi.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AllRetsep;