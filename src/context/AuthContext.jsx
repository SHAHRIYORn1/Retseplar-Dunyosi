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

  // Yangilangan universal funksiya
  const updateUserData = (newData) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...newData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser; // Yangi obyekt qaytarish reaktivlikni ta'minlaydi
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);