import React, { useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    console.log("Login:", { email, password });
    alert("Tizimga kirishga urinish: " + email);
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Tizimga kirish</h2>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Parol</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parolni kiriting"
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

        <Button variant="primary" type="submit">
          Kirish
        </Button>

        <p className={styles.toggleText}>
          Profilingiz yo'qmi? <a href="/register">Ro'yxatdan o'tish</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
