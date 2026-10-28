import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/home";
import CatalogPage from "@/pages/catalog";
import ProductPage from "@/pages/product";
import RouteEffects from "./RouteEffects";

const CartPage = lazy(() => import("@/pages/cart"));
const ContactsPage = lazy(() => import("@/pages/contacts"));
const FavoritesPage = lazy(() => import("@/pages/favorites"));
const VacanciesPage = lazy(() => import("@/pages/vacancies"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

const notFound = <Suspense fallback={<p role="status">Завантаження сторінки...</p>}><NotFoundPage /></Suspense>;
function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:sectionId" element={<CatalogPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
        </Route>
        <Route path="/404" element={notFound} />
        <Route path="*" element={notFound} />
      </Routes>
    </>
  );
}
export default App;
