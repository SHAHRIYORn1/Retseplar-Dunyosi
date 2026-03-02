import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Register.module.css"; 

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ma'lumotlarni localStorage ga saqlaymiz
    localStorage.setItem("registeredUser", JSON.stringify(formData));
    
    alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    navigate("/login");
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Ro'yxatdan o'tish</h2>
        <div className={styles.inputGroup}>
          <label>Foydalanuvchi nomi</label>
          <input 
            type="text" 
            placeholder="Username"
            onChange={(e) => setFormData({...formData, username: e.target.value})} 
            required 
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="example@mail.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Parol</label>
          <input 
            type="password" 
            placeholder="Kamida 6 ta belgi"
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
        </div>
        <Button variant="primary" type="submit">Ro'yxatdan o'tish</Button>
        <p className={styles.toggleText}>
          Profilingiz bormi? <Link to="/login">Tizimga kirish</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;