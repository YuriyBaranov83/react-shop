import { useCallback, useEffect, useMemo, useState } from "react";
import CartContext from "./CartContext";

const CART_STORAGE_KEY = "react-shop:cart";

const normalizeCartItems = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      id: typeof item?.id === "string" ? item.id : "",
      quantity: Math.max(0, Number(item?.quantity) || 0),
    }))
    .filter((item) => item.id && item.quantity > 0);
};

const readCartItems = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    return normalizeCartItems(JSON.parse(rawValue));
  } catch {
    return [];
  }
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(readCartItems);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const setItemQuantity = useCallback((id, nextQuantity) => {
    if (!id) {
      return;
    }

    const safeQuantity = Math.max(0, Number(nextQuantity) || 0);

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
    (id) => cartMap.get(id) ?? 0,
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
