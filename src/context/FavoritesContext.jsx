import React, { createContext, useContext, useState } from "react";

// 1. Context yaratamiz
const FavoritesContext = createContext();

// 2. Custom hook yaratamiz (componentlarda ishlatish uchun)
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

// 3. Provider komponentini yaratamiz
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Sevimli taomlarni qo'shish/o'chirish funksiyasi
  const toggleFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      // Agar taom allaqachon sevimlilarda bo'lsa, uni o'chiramiz
      if (prevFavorites.some((item) => item.title === recipe.title)) {
        return prevFavorites.filter((item) => item.title !== recipe.title);
      } 
      // Aks holda qo'shamiz
      else {
        return [...prevFavorites, recipe];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};