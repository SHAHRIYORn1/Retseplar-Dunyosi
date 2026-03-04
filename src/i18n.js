import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  uz: {
    translation: {
      "home": "Bosh sahifa",
      "all_recipes": "Barcha Retseptlar",
      "favorites": "Sevimlilar",
      "add_recipe": "Qo'shish",
      "login": "Kirish",
      "logout": "Chiqish",
      "brand": "Retseptlar Dunyosi",
      "auth_error": "Ushbu sahifadan foydalanish uchun avval tizimga kiring!",
      "cat_national": "Milliy Taomlar",
      "cat_fastfood": "FastFood",
      "cat_salads": "Salatlar",
      "cat_sweets": "Shirinliklar"
    }
  },
  ru: {
    translation: {
      "home": "Главная",
      "all_recipes": "Все Рецепты",
      "favorites": "Избранное",
      "add_recipe": "Добавить",
      "login": "Вход",
      "logout": "Выход",
      "brand": "Мир Рецептов",
      "auth_error": "Для доступа к этой странице войдите в систему!",
      "cat_national": "Национальные блюда",
      "cat_fastfood": "Фастфуд",
      "cat_salads": "Салаты",
      "cat_sweets": "Сладости"
    }
  },
  en: {
    translation: {
      "home": "Home",
      "all_recipes": "All Recipes",
      "favorites": "Favorites",
      "add_recipe": "Add Recipe",
      "login": "Login",
      "logout": "Logout",
      "brand": "Recipe World",
      "auth_error": "Please log in first to access this page!",
      "cat_national": "National Dishes",
      "cat_fastfood": "Fast Food",
      "cat_salads": "Salads",
      "cat_sweets": "Sweets"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "uz",
    interpolation: { escapeValue: false }
  });

export default i18n;