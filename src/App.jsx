import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Profile from "./pages/Profile/Profile"; 
import Admin from "./pages/Admin/Admin";

// Admin himoyasi uchun maxsus komponent
const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  
  // Agar admin bo'lmasa, uni login sahifasiga otib yuboramiz
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* FAQAT ADMIN KIRISHI MUMKIN */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } 
          />

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