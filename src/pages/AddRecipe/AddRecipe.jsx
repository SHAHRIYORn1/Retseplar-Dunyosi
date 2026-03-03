import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import styles from "./AddRecipe.module.css";

const AddRecipe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Milliy Taomlar");
  const [description, setDescription] = useState(""); // Tavsif uchun state
  const [imageUrl, setImageUrl] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState("Oddiy");

  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);

  useEffect(() => {
    if (!user) {
      alert("Retsept qo'shish uchun avval tizimga kiring!");
      navigate("/login");
    }
  }, [user, navigate]);

  const addField = (setter) => setter((prev) => [...prev, ""]);

  const removeField = (index, setter) => {
    setter((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  };

  const handleArrayChange = (index, value, setter) => {
    setter((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalImage = imageUrl.trim() !== "" ? imageUrl : "default.jpg";

    const newRecipe = {
      id: Date.now().toString(),
      title,
      category,
      description, // Tavsif obyektga qo'shildi
      imageName: finalImage,
      time,
      servings,
      difficulty,
      ingredients: ingredients.filter(i => i.trim() !== ""),
      steps: steps.filter(s => s.trim() !== ""),
    };

    const existingData = JSON.parse(localStorage.getItem("allRecipes")) || [];
    localStorage.setItem("allRecipes", JSON.stringify([...existingData, newRecipe]));

    alert("Retsept muvaffaqiyatli saqlandi!");
    navigate("/all-recipes");
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <form className={styles.addForm} onSubmit={handleSubmit}>
            <h2>Yangi Retsept Qo'shish</h2>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Taom nomi</label>
                <input type="text" placeholder="Masalan: Manti" onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Kategoriya</label>
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option>Milliy Taomlar</option>
                  <option>Salatlar</option>
                  <option>FastFood</option>
                  <option>Shirinliklar</option>
                </select>
              </div>
            </div>

            {/* TAVSIF MAYDONI */}
            <div className={styles.inputGroup}>
              <label>Qisqacha tavsif</label>
              <textarea 
                placeholder="Taom haqida qisqacha ma'lumot yozing..." 
                onChange={(e) => setDescription(e.target.value)} 
                rows="3"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Rasm URL</label>
              <input type="text" placeholder="https://..." onChange={(e) => setImageUrl(e.target.value)} />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Vaqt</label>
                <input type="text" placeholder="45 daqiqa" onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Porsiya</label>
                <input type="number" placeholder="4" onChange={(e) => setServings(e.target.value)} required />
              </div>
            </div>

            {/* MASALLIQLAR VA BOSQICHLAR (OLDINGI KODDAGIDEK) */}
            <div className={styles.dynamicSection}>
              <label className={styles.sectionTitle}>Masalliqlar</label>
              {ingredients.map((ing, index) => (
                <div key={index} className={styles.dynamicInputGroup}>
                  <input type="text" placeholder={`${index + 1}-masalliq`} value={ing} onChange={(e) => handleArrayChange(index, e.target.value, setIngredients)} />
                  <button type="button" className={styles.deleteBtn} onClick={() => removeField(index, setIngredients)}>✕</button>
                </div>
              ))}
              <button type="button" className={styles.addBtn} onClick={() => addField(setIngredients)}>+</button>
            </div>

            <div className={styles.dynamicSection}>
              <label className={styles.sectionTitle}>Tayyorlanish bosqichlari</label>
              {steps.map((step, index) => (
                <div key={index} className={styles.dynamicInputGroup}>
                  <textarea placeholder={`${index + 1}-qadam`} value={step} onChange={(e) => handleArrayChange(index, e.target.value, setSteps)} />
                  <button type="button" className={styles.deleteBtn} onClick={() => removeField(index, setSteps)}>✕</button>
                </div>
              ))}
              <button type="button" className={styles.addBtn} onClick={() => addField(setSteps)}>+</button>
            </div>

            <button type="submit" className={styles.submitBtn}>Saqlash</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddRecipe;