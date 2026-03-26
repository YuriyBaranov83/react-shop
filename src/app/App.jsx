import { CartPage, ContactsPage, FavoritesPage, HomePage, NotFoundPage } from "@/pages";
import MainLayout from "@/components/layout/MainLayout";
import homeStyles from "@/pages/home/HomePage.module.css";
import cartStyles from "@/pages/cart/CartPage.module.css";
import contactsStyles from "@/pages/contacts/ContactsPage.module.css";
import favoritesStyles from "@/pages/favorites/FavoritesPage.module.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout mainClassName={homeStyles["home-page-main"]} mainId="home-page" />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route
        element={
          <MainLayout
            mainClassName={contactsStyles["contacts-main"]}
            mainId="contacts-page"
          />
        }
      >
        <Route path="/contacts" element={<ContactsPage />} />
      </Route>

      <Route
        element={
          <MainLayout
            mainClassName={favoritesStyles["favorites-main"]}
            mainId="favorites-page"
          />
        }
      >
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>

      <Route
        element={
          <MainLayout
            mainClassName={cartStyles["cart-main"]}
            mainId="cart-page"
          />
        }
      >
        <Route path="/cart" element={<CartPage />} />
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
