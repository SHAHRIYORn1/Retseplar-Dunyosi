import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Sahifalar (Pages)
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AllRetsep from "./pages/AllRetsep";
import Favorites from "./pages/Favorites/Favorites";
import AddRecipe from "./pages/AddRecipe/AddRecipe"; 

// MANA SHU IMPORTNI QO'SHDIM:
import Profile from "./pages/Profile/Profile"; 

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Endi Profile ishlashi kerak */}
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/all-recipes" element={<AllRetsep />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;