import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Register.module.css"; // Login.module.css dagi stilarni bunga ko'chirib oling

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Muvaffaqiyatli ro'yxatdan o'tdingiz: " + user.username);
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
            onChange={(e) => setUser({...user, username: e.target.value})}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            onChange={(e) => setUser({...user, email: e.target.value})}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Parol</label>
          <input
            type="password"
            placeholder="Kamida 6 ta belgi"
            onChange={(e) => setUser({...user, password: e.target.value})}
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