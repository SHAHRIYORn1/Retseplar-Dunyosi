import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AllRetsep from "./pages/AllRetsep"; 
// import Favorites from "./pages/Favorites"; // <--- Buni kommentga oling

import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-recipes" element={<AllRetsep />} />
        {/* <Route path="/favorites" element={<Favorites />} /> */} {/* <--- Buni ham kommentga oling */}
      </Routes>
    </FavoritesProvider>
  );
}

export default App;