import { useCallback, useEffect, useMemo, useState } from "react";
import FavoritesContext from "./FavoritesContext";

const FAVORITES_STORAGE_KEY = "react-shop:favorites";

const readFavoriteIds = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((id) => typeof id === "string");
  } catch {
    return [];
  }
};

const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState(readFavoriteIds);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = useCallback((id) => {
    if (!id) {
      return;
    }

    setFavoriteIds((prevFavoriteIds) => {
      if (prevFavoriteIds.includes(id)) {
        return prevFavoriteIds.filter((favoriteId) => favoriteId !== id);
      }

      return [...prevFavoriteIds, id];
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
  }, []);

  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const isFavorite = useCallback(
    (id) => favoriteIdSet.has(id),
    [favoriteIdSet]
  );

  const value = useMemo(
    () => ({
      clearFavorites,
      favoriteIds,
      favoritesCount: favoriteIds.length,
      isFavorite,
      toggleFavorite,
    }),
    [clearFavorites, favoriteIds, isFavorite, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export default FavoritesProvider;
