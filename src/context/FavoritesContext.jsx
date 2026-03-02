import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Context yaratamiz
const FavoritesContext = createContext();

// 2. Provider komponentini yaratamiz
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("LocalStorage'dan o'qishda xatolik:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (taom) => {
    if (!taom || !taom.id) return;

    setFavorites((prev) => {
      const isFavorite = prev.find((item) => item.id === taom.id);
      if (isFavorite) {
        return prev.filter((item) => item.id !== taom.id);
      } else {
        return [...prev, taom];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// 3. Hook'ni alohida eksport qilamiz
export const useFavorites = () => useContext(FavoritesContext);
