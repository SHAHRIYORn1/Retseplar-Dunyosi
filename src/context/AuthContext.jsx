import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Profilni yangilash (Navbar va Profile uchun reaktiv)
  const updateUserData = (newData) => {
    setUser((prevUser) => {
      const updated = { ...prevUser, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  // Retseptni o'chirish
  const deleteRecipe = (recipeId) => {
    const allRecipes = JSON.parse(localStorage.getItem("allRecipes")) || [];
    const filtered = allRecipes.filter(r => r.id !== recipeId);
    localStorage.setItem("allRecipes", JSON.stringify(filtered));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserData, deleteRecipe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);