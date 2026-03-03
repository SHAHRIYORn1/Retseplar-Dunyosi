import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Foydalanuvchi o'zgarganda (login/logout) sevimlilarni yuklash
  useEffect(() => {
    if (user) {
      // Har bir foydalanuvchi uchun alohida kalit (favorites_username)
      const saved = localStorage.getItem(`favorites_${user.username}`);
      setFavorites(saved ? JSON.parse(saved) : []);
    } else {
      // Foydalanuvchi chiqib ketsa, state'ni tozalash
      setFavorites([]);
    }
  }, [user]);

  // Sevimlilar o'zgarganda localStorage'ga yozish
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const toggleFavorite = (taom) => {
    if (!user) {
      alert("Sevimlilarga qo'shish uchun avval akkauntingizga kiring!");
      return;
    }

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

export const useFavorites = () => useContext(FavoritesContext);
export default FavoritesContext;