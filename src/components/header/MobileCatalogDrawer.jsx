import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline, IoSearch } from "react-icons/io5";
import { catalogData } from "@/data/catalogData";
import { footerClientLinks } from "@/data/footerData";
import useFavorites from "@/features/favorites/model/useFavorites";
import useCart from "@/features/cart/model/useCart";
import Modal from "@/components/ui/Modal/Modal";
import { logo } from "@assets/images";
import styles from "./header.module.css";

const MobileCatalogDrawer = ({ onClose, onSearchClick, onLoginClick }) => {
  const titleId = useId();
  const { favoritesCount } = useFavorites();
  const { cartCount } = useCart();
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const activeCategory = catalogData.find((item) => item.id === activeCategoryId);
  return (
    <Modal onClose={onClose} labelledBy={titleId} overlayClassName={styles["catalog-drawer-overlay"]} className={styles["catalog-drawer"]}>
      <h2 id={titleId} className="visually-hidden">Меню каталогу</h2>
      <div className={styles["catalog-drawer-top"]}>
        <button type="button" className={styles["catalog-drawer-close-btn"]} onClick={onClose} aria-label="Закрити меню">
          <IoCloseOutline aria-hidden="true" />
        </button>
        <Link to="/" className={styles["catalog-drawer-brand"]} aria-label="На головну" onClick={onClose}>
          <img src={logo} alt="" width="150" height="50" />
        </Link>
        <button type="button" className={styles["catalog-drawer-search-btn"]} onClick={onSearchClick} aria-label="Відкрити пошук">
          <IoSearch aria-hidden="true" />
        </button>
      </div>
      <div className={styles["catalog-drawer-body"]}>
        {activeCategory ? <>
          <div className={styles["catalog-drawer-subheader"]}>
            <button type="button" className={styles["catalog-drawer-back-btn"]} onClick={() => setActiveCategoryId(null)} aria-label="Назад до категорій" autoFocus>
              <IoChevronBackOutline aria-hidden="true" />
            </button>
            <h3 className={styles["catalog-drawer-subtitle"]}>{activeCategory.title}</h3>
          </div>
          <ul className={styles["catalog-drawer-sub-list"]}>
            <li><Link to={activeCategory.href} className={styles["catalog-drawer-sub-item"]} onClick={onClose}>Дивитися весь розділ</Link></li>
            {activeCategory.items.map((item) => <li key={item.id}>
              <Link to={item.href} className={styles["catalog-drawer-sub-item"]} onClick={onClose}>{item.label}</Link>
            </li>)}
          </ul>
        </> : <>
          <h3 className={styles["catalog-drawer-section-title"]}>Каталог</h3>
          <ul className={styles["catalog-drawer-list"]}>
            {catalogData.map((category) => <li key={category.id}>
              <button type="button" className={styles["catalog-drawer-item"]} onClick={() => setActiveCategoryId(category.id)}>
                <span>{category.title}</span><IoChevronForwardOutline aria-hidden="true" />
              </button>
            </li>)}
          </ul>
          <section className={styles["catalog-drawer-section"]}>
            <h3 className={styles["catalog-drawer-section-subtitle"]}>Покупки та профіль</h3>
            <ul className={styles["catalog-drawer-meta-list"]}>
              <li><Link to="/cart" className={styles["catalog-drawer-meta-link"]} onClick={onClose}>Кошик ({cartCount})</Link></li>
              <li><Link to="/favorites" className={styles["catalog-drawer-meta-link"]} onClick={onClose}>Обране ({favoritesCount})</Link></li>
              <li><button type="button" className={styles["catalog-drawer-meta-link"]} onClick={onLoginClick}>Увійти (демо)</button></li>
            </ul>
          </section>
          <section className={styles["catalog-drawer-section"]}>
            <h3 className={styles["catalog-drawer-section-subtitle"]}>Urbanfood клуб</h3>
            <ul className={styles["catalog-drawer-club-list"]}>
              {footerClientLinks.filter((item) => item.href).map((item) => <li key={item.id}>
                <Link to={item.href} className={styles["catalog-drawer-club-link"]} onClick={onClose}>{item.label}</Link>
              </li>)}
            </ul>
          </section>
        </>}
      </div>
    </Modal>
  );
};
export default MobileCatalogDrawer;
