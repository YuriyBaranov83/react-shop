import { useCallback, useEffect, useMemo, useState } from "react";
import FavoritesContext from "./FavoritesContext";
import { allProductsData } from "@/data/allProductsData";
import { resolveProductId } from "@/data/productAliases";
import { readStoredValue, writeStoredValue } from "@/utils/storage";
import { normalizeFavoriteIds } from "@/features/cart/model/cartModel";

const FAVORITES_STORAGE_KEY = "react-shop:favorites";

const productsById = new Map(allProductsData.map((product) => [product.id, product]));
const readFavoriteIds = () => normalizeFavoriteIds(readStoredValue(FAVORITES_STORAGE_KEY), productsById);

const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState(readFavoriteIds);

  useEffect(() => {
    writeStoredValue(FAVORITES_STORAGE_KEY, favoriteIds);
  }, [favoriteIds]);

  const toggleFavorite = useCallback((requestedId) => {
    const id = resolveProductId(requestedId);
    if (!productsById.has(id)) {
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
    (id) => favoriteIdSet.has(resolveProductId(id)),
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
