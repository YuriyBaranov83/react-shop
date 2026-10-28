import { useCallback, useEffect, useMemo, useState } from "react";
import CartContext from "./CartContext";
import { allProductsData } from "@/data/allProductsData";
import { resolveProductId } from "@/data/productAliases";
import { readStoredValue, writeStoredValue } from "@/utils/storage";
import { normalizeCartItems, normalizeQuantity } from "./cartModel";

const CART_STORAGE_KEY = "react-shop:cart";

const productsById = new Map(allProductsData.map((product) => [product.id, product]));
const readCartItems = () => normalizeCartItems(readStoredValue(CART_STORAGE_KEY), productsById);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(readCartItems);

  useEffect(() => {
    writeStoredValue(CART_STORAGE_KEY, cartItems);
  }, [cartItems]);

  const setItemQuantity = useCallback((requestedId, nextQuantity) => {
    const id = resolveProductId(requestedId);
    const product = productsById.get(id);
    if (!product) {
      return;
    }

    const safeQuantity = normalizeQuantity(nextQuantity, product.stock);

    setCartItems((prevCartItems) => {
      const existingIndex = prevCartItems.findIndex((item) => item.id === id);

      if (safeQuantity <= 0) {
        if (existingIndex === -1) {
          return prevCartItems;
        }

        return prevCartItems.filter((item) => item.id !== id);
      }

      if (existingIndex === -1) {
        return [...prevCartItems, { id, quantity: safeQuantity }];
      }

      if (prevCartItems[existingIndex].quantity === safeQuantity) return prevCartItems;

      return prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: safeQuantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartMap = useMemo(
    () => new Map(cartItems.map((item) => [item.id, item.quantity])),
    [cartItems]
  );

  const getItemQuantity = useCallback(
    (id) => cartMap.get(resolveProductId(id)) ?? 0,
    [cartMap]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartCount,
      cartItems,
      clearCart,
      getItemQuantity,
      setItemQuantity,
    }),
    [cartCount, cartItems, clearCart, getItemQuantity, setItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
