import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user, updateUserData, deleteRecipe } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [myRecipes, setMyRecipes] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    avatar: "",
    email: "",
    username: "",
    currentPassword: "",
    newPassword: "",
  });

  const loadRecipes = () => {
    const data = JSON.parse(localStorage.getItem("allRecipes")) || [];
    setMyRecipes(
      data.filter((r) => r.author === user?.username || r.userId === user?.id),
    );
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        avatar: user.avatar || "",
        email: user.email || "",
        username: user.username || "",
      }));
      loadRecipes();
    }
  }, [user]);

  const handleDelete = (id) => {
    if (window.confirm("Ushbu retseptni o'chirmoqchimisiz?")) {
      deleteRecipe(id);
      loadRecipes();
      alert("O'chirildi!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSecretChanged =
      formData.email !== user.email || formData.newPassword !== "";

    if (isSecretChanged && formData.currentPassword !== user.password) {
      alert(
        "Email yoki parolni o'zgartirish uchun joriy parolingizni kiriting!",
      );
      return;
    }

    updateUserData({
      fullName: formData.fullName,
      avatar: formData.avatar,
      username: formData.username,
      email: formData.email,
      password: formData.newPassword || user.password,
    });

    alert("Muvaffaqiyatli saqlandi!");
    setIsEditing(false);
    setFormData((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
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
                  <img src={user.avatar} alt="P" />
                ) : (
                  <div className={styles.letterAvatar}>
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className={styles.userInfo}>
                <h1>{user?.fullName || user?.username}</h1>
                <p className={styles.handle}>@{user?.username}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.editBtn}
                >
                  Profilni sozlash
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.editForm}>
              <h2>Tahrirlash</h2>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Ism</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Rasm URL</label>
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={(e) =>
                      setFormData({ ...formData, avatar: e.target.value })
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.passwordSection}>
                <p>
                  Email yoki parolni o'zgartirish uchun joriy parolni
                  tasdiqlang:
                </p>
                <input
                  type="password"
                  placeholder="Joriy parol"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveBtn}>
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={styles.cancelBtn}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
};

export default Profile;
