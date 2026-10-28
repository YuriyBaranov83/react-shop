import { useContext } from "react";
import FavoritesContext from "./FavoritesContext";

const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
};

export default useFavorites;
