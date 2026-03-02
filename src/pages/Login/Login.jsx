import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext"; 
import styles from "./Login.module.css"; // Register.module.css bilan bir xil bo'lishi mumkin

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      registeredUser &&
      formData.email === registeredUser.email &&
      formData.password === registeredUser.password
    ) {
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
        {error && <p style={{color: "red", textAlign: "center", marginBottom: "10px"}}>{error}</p>}
        
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
            placeholder="Parolni kiriting"
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
        </div>
        
        <Button variant="primary" type="submit">Kirish</Button>
        <p className={styles.toggleText}>
          Profilingiz yo'qmi? <Link to="/register">Ro'yxatdan o'tish</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;