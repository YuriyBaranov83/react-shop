import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./app/App.jsx";
import CartProvider from "@/features/cart/model/CartProvider";
import FavoritesProvider from "@/features/favorites/model/FavoritesProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  </StrictMode>
);
