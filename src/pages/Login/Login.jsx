import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext"; 
import styles from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. ADMIN TEKSHIRUVI
    if (formData.email === "admin@gmail.com" && formData.password === "admin123456") {
      localStorage.setItem("isAdmin", "true"); // Admin ekanini belgilash
      // Admin uchun ham vaqtincha user obyekti yaratamiz (Navbar buzilmasligi uchun)
      const adminUser = { fullName: "Administrator", email: "admin@gmail.com", role: "admin" };
      login(adminUser);
      navigate("/admin");
      return;
    }

    // 2. ODDIY FOYDALANUVCHI TEKSHIRUVI
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      registeredUser &&
      formData.email === registeredUser.email &&
      formData.password === registeredUser.password
    ) {
      localStorage.removeItem("isAdmin"); // Admin emasligini aniqlashtirish
      login(registeredUser); 
      navigate("/"); 
    } else {
      setError("Email yoki parol noto'g'ri!");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Tizimga kirish</h2>
        {error && <p className={styles.errorText}>{error}</p>}
        
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="example@mail.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Parol</label>
          <div className={styles.passwordWrapper}>
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Parolni kiriting"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
            <span 
              className={styles.togglePassword} 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>
        
        <div className={styles.buttonGroup}>
          <Button variant="primary" type="submit">Kirish</Button>
          <Link to="/" className={styles.homeBtn}>Bosh sahifa</Link>
        </div>

        <p className={styles.toggleText}>
          Profilingiz yo'qmi? <Link to="/register">Ro'yxatdan o'tish</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;