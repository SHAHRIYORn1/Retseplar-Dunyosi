import { useContext } from "react";
import FavoritesContext from "./FavoritesContext";

export const useFavorites = () => useContext(FavoritesContext);
