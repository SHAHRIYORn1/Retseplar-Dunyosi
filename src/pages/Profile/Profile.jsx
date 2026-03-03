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
    currentPassword: "", // Tasdiqlash uchun
    newPassword: ""      // Yangi parol uchun
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

    // 1. Muhim ma'lumotlar o'zgarganini tekshiramiz (Email yoki Yangi Parol)
    const isSecretChanged = formData.email !== user.email || formData.newPassword !== "";

    if (isSecretChanged) {
      // Agar email yoki parol o'zgarayotgan bo'lsa, joriy parolni tekshirish shart
      if (formData.currentPassword !== user.password) {
        alert("Email yoki parolni o'zgartirish uchun amaldagi parolni to'g'ri kiriting!");
        return;
      }
    }

    // 2. Yangi obyekt tayyorlaymiz
    const updatedData = {
      fullName: formData.fullName,
      avatar: formData.avatar,
      username: formData.username,
      email: formData.email,
      password: formData.newPassword || user.password // Agar yangi parol yozilmagan bo'lsa, eskisi qoladi
    };

    // 3. Saqlash
    updateUserData(updatedData);
    alert("Ma'lumotlar muvaffaqiyatli saqlandi!");
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
                <img src={user?.avatar || "https://via.placeholder.com/150"} alt="Avatar" />
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

              {/* Faqat email yoki parol o'zgarishi kerak bo'lsa, foydalanuvchi ko'rishi uchun qizil eslatma */}
              <div className={styles.passwordSection}>
                <p className={styles.sectionHint}>
                  Email yoki parolni o'zgartirishni xohlasangiz, joriy parolingizni kiritishingiz shart:
                </p>
                <div className={styles.formGrid}>
                  <input type="password" placeholder="Joriy parol (tasdiqlash uchun)" value={formData.currentPassword} onChange={(e) => setFormData({...formData, currentPassword: e.target.value})} />
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
        
        {/* Retseptlar ro'yxati (o'zgarishsiz qoladi) */}
        <div className={styles.recipesHeader}>
          <h3>Mening retseptlarim ({myRecipes.length})</h3>
        </div>
        <div className={styles.recipesGrid}>
           {myRecipes.map(recipe => (
             <div key={recipe.id} className={styles.recipeCard}>
               <img src={recipe.imageName} alt="" />
               <div className={styles.recipeContent}>
                 <h4>{recipe.title}</h4>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;