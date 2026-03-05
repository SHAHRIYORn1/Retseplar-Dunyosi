import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Admin.module.css";

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, pending: 0 });

  // TAHRIRLASH MODAL HOLATI
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    status: "",
    ingredients: [""],
    steps: [""]
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/login");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = () => {
    const savedData = JSON.parse(localStorage.getItem("allRecipes")) || 
                      JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(savedData);
    setStats({
      total: savedData.length,
      published: savedData.filter(r => r.status === "Faol" || r.status === "published" || !r.status).length,
      pending: savedData.filter(r => r.status === "Kutilmoqda" || r.status === "pending").length
    });
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("isAdmin");
    logout();
    navigate("/login");
  };

  const deleteRecipe = (id) => {
    if (window.confirm("Ushbu retseptni butunlay o'chirmoqchimisiz?")) {
      const updated = recipes.filter(r => r.id !== id);
      saveToLocal(updated);
    }
  };

  // TAHRIRLASHNI BOSHLASH (Ma'lumotlarni formaga yuklash)
  const startEdit = (recipe) => {
    setEditingRecipe(recipe);
    setEditForm({
      title: recipe.title?.uz || recipe.title || "",
      category: recipe.category?.uz || recipe.category || "Milliy Taomlar",
      status: recipe.status || "Faol",
      ingredients: recipe.ingredients && recipe.ingredients.length > 0 ? [...recipe.ingredients] : [""],
      steps: recipe.steps && recipe.steps.length > 0 ? [...recipe.steps] : [""]
    });
  };

  // DINAMIK MAYDONLAR BILAN ISHLASH (Masalliq va Qadamlar)
  const handleArrayChange = (index, value, field) => {
    const newArr = [...editForm[field]];
    newArr[index] = value;
    setEditForm({ ...editForm, [field]: newArr });
  };

  const addField = (field) => {
    setEditForm({ ...editForm, [field]: [...editForm[field], ""] });
  };

  const removeField = (index, field) => {
    if (editForm[field].length > 1) {
      const newArr = editForm[field].filter((_, i) => i !== index);
      setEditForm({ ...editForm, [field]: newArr });
    }
  };

  // SAQLASH
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedRecipes = recipes.map(r => 
      r.id === editingRecipe.id 
      ? { 
          ...r, 
          title: editForm.title, 
          category: editForm.category, 
          status: editForm.status,
          ingredients: editForm.ingredients.filter(i => i.trim() !== ""),
          steps: editForm.steps.filter(s => s.trim() !== "")
        } 
      : r
    );
    saveToLocal(updatedRecipes);
    setEditingRecipe(null);
  };

  const saveToLocal = (data) => {
    localStorage.setItem("allRecipes", JSON.stringify(data));
    localStorage.setItem("recipes", JSON.stringify(data));
    setRecipes(data);
    loadData();
  };

  return (
    <div className={styles.adminPage}>
      <Navbar />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* HEADER */}
          <header className={styles.adminHeader}>
            <h1>Admin Boshqaruv Paneli</h1>
            <button onClick={handleAdminLogout} className={styles.logoutBtn}>
              🚪 Chiqish
            </button>
          </header>

          {/* STATISTIKA */}
          <section className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>{stats.total}</h3>
              <p>Jami</p>
            </div>
            <div className={styles.statCard}>
              <h3>{stats.published}</h3>
              <p>Faol</p>
            </div>
            <div className={styles.statCard}>
              <h3>{stats.pending}</h3>
              <p>Kutilmoqda</p>
            </div>
          </section>

          {/* JADVAL */}
          <section className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <h2>Retseptlar Ro'yxati</h2>
              <button className={styles.addBtn} onClick={() => navigate("/add-recipe")}>
                + Yangi qo'shish
              </button>
            </div>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Nomi</th>
                  <th>Kategoriya</th>
                  <th>Holati</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td>
                      <strong>{recipe.title?.uz || recipe.title}</strong>
                    </td>
                    <td>{recipe.category?.uz || recipe.category}</td>
                    <td>{recipe.status || "Faol"}</td>
                    <td className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => startEdit(recipe)}
                        title="Tahrirlash"
                      >
                        ✏️
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteRecipe(recipe.id)}
                        title="O'chirish"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>

      {/* TO'LIQ TAHRIRLASH MODALI */}
      {editingRecipe && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Retseptni tahrirlash</h3>
            <form onSubmit={handleUpdate} className={styles.editFormScroll}>
              
              {/* NOMI */}
              <div className={styles.formGroup}>
                <label htmlFor="title">Taom nomi:</label>
                <input
                  id="title"
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  placeholder="Taom nomini kiriting..."
                  required
                />
              </div>

              {/* KATEGORIYA VA HOLATI */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="category">Kategoriya:</label>
                  <select
                    id="category"
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  >
                    <option value="Milliy Taomlar">Milliy Taomlar</option>
                    <option value="Salatlar">Salatlar</option>
                    <option value="FastFood">FastFood</option>
                    <option value="Shirinliklar">Shirinliklar</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="status">Holati:</label>
                  <select
                    id="status"
                    value={editForm.status}
                    onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                  >
                    <option value="Faol">Faol</option>
                    <option value="Kutilmoqda">Kutilmoqda</option>
                  </select>
                </div>
              </div>

              {/* MASALLIQLAR BO'LIMI */}
              <div className={styles.dynamicSection}>
                <label htmlFor="ingredients">Masalliqlar:</label>
                {editForm.ingredients.map((ing, idx) => (
                  <div key={idx} className={styles.dynamicRow}>
                    <input
                      type="text"
                      value={ing}
                      onChange={(e) => handleArrayChange(idx, e.target.value, "ingredients")}
                      placeholder={`Masalliq ${idx + 1}...`}
                    />
                    <button
                      type="button"
                      onClick={() => removeField(idx, "ingredients")}
                      title="O'chirish"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.addSmallBtn}
                  onClick={() => addField("ingredients")}
                >
                  + Masalliq qo'shish
                </button>
              </div>

              {/* QADAMLAR BO'LIMI */}
              <div className={styles.dynamicSection}>
                <label htmlFor="steps">Tayyorlanish bosqichlari:</label>
                {editForm.steps.map((step, idx) => (
                  <div key={idx} className={styles.dynamicRow}>
                    <textarea
                      value={step}
                      onChange={(e) => handleArrayChange(idx, e.target.value, "steps")}
                      placeholder={`Qadam ${idx + 1} tavsifini kiriting...`}
                    />
                    <button
                      type="button"
                      onClick={() => removeField(idx, "steps")}
                      title="O'chirish"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.addSmallBtn}
                  onClick={() => addField("steps")}
                >
                  + Qadam qo'shish
                </button>
              </div>

              {/* ACTION BUTTONS */}
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveBtn}>
                  💾 Saqlash
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setEditingRecipe(null)}
                >
                  ❌ Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;