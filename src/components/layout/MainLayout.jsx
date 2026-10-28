import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./MainLayout.module.css";

const MainLayout = () => (
  <>
    <a href="#main-content" className={styles["skip-link"]}>Перейти до вмісту</a>
    <Header />
    <main id="main-content" className={styles.main} tabIndex={-1}>
      <Suspense fallback={<p className={styles.loading} role="status">Завантаження сторінки...</p>}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </>
);
export default MainLayout;
