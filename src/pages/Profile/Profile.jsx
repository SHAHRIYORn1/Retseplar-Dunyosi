import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user, updateUserData } = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [myRecipes, setMyRecipes] = useState([]);
  
  const [formData, setFormData] = useState({
    fullName: "",
    avatar: "",
    email: "",
    username: "",
    currentPassword: "",
    newPassword: ""
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || "",
        avatar: user.avatar || "",
        email: user.email || "",
        username: user.username || ""
      }));
    }
    const localData = JSON.parse(localStorage.getItem("allRecipes")) || [];
    setMyRecipes(localData);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Faqat Email yoki Yangi Parol kiritilganda joriy parolni tekshirish
    const isSecretChanged = formData.email !== user.email || formData.newPassword !== "";

    if (isSecretChanged) {
      if (formData.currentPassword !== user.password) {
        alert("Email yoki parolni o'zgartirish uchun joriy parolni to'g'ri kiriting!");
        return;
      }
    }

    const updatedData = {
      fullName: formData.fullName,
      avatar: formData.avatar,
      username: formData.username,
      email: formData.email,
      password: formData.newPassword || user.password
    };

    updateUserData(updatedData);
    alert("Ma'lumotlar saqlandi!");
    setIsEditing(false);
    setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "" }));
  };

  return (
    <div className={styles.profilePage}>
      <Navbar />
      <div className={styles.container}>
        <section className={styles.mainCard}>
          {!isEditing ? (
            <div className={styles.profileDisplay}>
              <div className={styles.avatarWrapper}>
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" />
                ) : (
                  <div className={styles.largeLetterAvatar}>
                    {(user?.fullName?.charAt(0) || user?.username?.charAt(0))?.toUpperCase()}
                  </div>
                )}
              </div>
              <div className={styles.userInfo}>
                <h1>{user?.fullName || user?.username}</h1>
                <p className={styles.handle}>@{user?.username}</p>
                <p className={styles.emailText}>{user?.email}</p>
                <button onClick={() => setIsEditing(true)} className={styles.editMainBtn}>
                  Profilni sozlash
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.editForm}>
              <h2>Profil sozlamalari</h2>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>To'liq ism</label>
                  <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Username</label>
                  <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Rasm URL</label>
                  <input type="text" value={formData.avatar} onChange={(e) => setFormData({...formData, avatar: e.target.value})} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email (Gmail)</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className={styles.passwordSection}>
                <p className={styles.sectionHint}>Email yoki parolni o'zgartirish uchun tasdiqlash:</p>
                <div className={styles.formGrid}>
                  <input type="password" placeholder="Joriy parol" value={formData.currentPassword} onChange={(e) => setFormData({...formData, currentPassword: e.target.value})} />
                  <input type="password" placeholder="Yangi parol (ixtiyoriy)" value={formData.newPassword} onChange={(e) => setFormData({...formData, newPassword: e.target.value})} />
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.saveBtn}>Saqlash</button>
                <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelBtn}>Bekor qilish</button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;