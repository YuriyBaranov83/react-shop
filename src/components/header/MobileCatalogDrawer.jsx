import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  IoCloseOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoSearch,
} from "react-icons/io5";
import { MdPhoneInTalk } from "react-icons/md";

import { catalogData } from "@/data/catalogData";
import { footerClientLinks } from "@/data/footerData";
import useFavorites from "@/features/favorites/model/useFavorites";
import { logo } from "@assets/images";
import styles from "./header.module.css";

const clubMenuItems = footerClientLinks;

const MobileCatalogDrawer = ({ onClose, onSearchClick }) => {
  const { favoritesCount } = useFavorites();
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const isAuthed = false;
  const userName = "Ім'я Прізвище";
  const hasCartItems = false;
  const bonusCount = 0;

  const activeCategory = useMemo(
    () => catalogData.find((item) => item.id === activeCategoryId),
    [activeCategoryId]
  );

  const profileMenuItems = useMemo(() => {
    if (!isAuthed) {
      return [
        { id: "login", label: "Увійти" },
        {
          id: "favorites",
          label: "Обране",
          badge: favoritesCount > 0 ? `${favoritesCount} тов.` : undefined,
          badgeTone: "muted",
        },
      ];
    }

    return [
      { id: "user", label: userName },
      ...(hasCartItems ? [{ id: "orders", label: "Замовлення", hasDot: true }] : []),
      {
        id: "bonus",
        label: "Бонуси",
        badge: bonusCount > 0 ? String(bonusCount) : undefined,
        badgeTone: "accent",
      },
      {
        id: "favorites",
        label: "Обране",
        badge: favoritesCount > 0 ? `${favoritesCount} тов.` : undefined,
        badgeTone: "muted",
      },
      { id: "logout", label: "Вихід", muted: true },
    ];
  }, [isAuthed, userName, hasCartItems, bonusCount, favoritesCount]);

  return (
    <div className={styles["catalog-drawer-overlay"]} role="dialog" aria-modal="true">
      <div className={styles["catalog-drawer"]}>
        <div className={styles["catalog-drawer-top"]}>
          <button
            type="button"
            className={styles["catalog-drawer-close-btn"]}
            onClick={onClose}
            aria-label="Закрити меню"
          >
            <IoCloseOutline />
          </button>

          <Link
            to="/"
            className={styles["catalog-drawer-brand"]}
            aria-label="На головну"
            onClick={onClose}
          >
            <img src={logo} alt="Urbanfood" />
          </Link>

          <button
            type="button"
            className={styles["catalog-drawer-search-btn"]}
            onClick={onSearchClick}
            aria-label="Відкрити пошук"
          >
            <IoSearch />
          </button>
        </div>

        <div className={styles["catalog-drawer-body"]}>
          {!activeCategory && (
            <>
              <h2 className={styles["catalog-drawer-section-title"]}>КАТАЛОГ</h2>
              <ul className={styles["catalog-drawer-list"]}>
                {catalogData.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      className={styles["catalog-drawer-item"]}
                      onClick={() => setActiveCategoryId(category.id)}
                    >
                      <span>{category.title}</span>
                      <IoChevronForwardOutline />
                    </button>
                  </li>
                ))}
              </ul>

              <section className={styles["catalog-drawer-section"]}>
                <h3 className={styles["catalog-drawer-section-subtitle"]}>ПРОФІЛЬ</h3>
                <ul className={styles["catalog-drawer-meta-list"]}>
                  {profileMenuItems.map((item) => (
                    <li key={item.id}>
                      {item.id === "favorites" ? (
                        <Link
                          to="/favorites"
                          className={`${styles["catalog-drawer-meta-link"]} ${item.muted ? styles["catalog-drawer-meta-link-muted"] : ""}`.trim()}
                          onClick={onClose}
                        >
                          <span>{item.label}</span>
                          <span className={styles["catalog-drawer-meta-right"]}>
                            {item.hasDot && (
                              <span className={styles["catalog-drawer-meta-dot"]} aria-hidden="true" />
                            )}
                            {item.badge && (
                              <span
                                className={`${styles["catalog-drawer-meta-badge"]} ${item.badgeTone === "muted" ? styles["catalog-drawer-meta-badge-muted"] : ""}`.trim()}
                              >
                                {item.badge}
                              </span>
                            )}
                          </span>
                        </Link>
                      ) : (
                        <a
                          href="#"
                          className={`${styles["catalog-drawer-meta-link"]} ${item.muted ? styles["catalog-drawer-meta-link-muted"] : ""}`.trim()}
                        >
                          <span>{item.label}</span>
                          <span className={styles["catalog-drawer-meta-right"]}>
                            {item.hasDot && (
                              <span className={styles["catalog-drawer-meta-dot"]} aria-hidden="true" />
                            )}
                            {item.badge && (
                              <span
                                className={`${styles["catalog-drawer-meta-badge"]} ${item.badgeTone === "muted" ? styles["catalog-drawer-meta-badge-muted"] : ""}`.trim()}
                              >
                                {item.badge}
                              </span>
                            )}
                          </span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styles["catalog-drawer-section"]}>
                <h3 className={styles["catalog-drawer-section-subtitle"]}>Urbanfood КЛУБ</h3>
                <ul className={styles["catalog-drawer-club-list"]}>
                  {clubMenuItems.map((item) => (
                    <li key={item.id}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </section>

              <div className={styles["catalog-drawer-phone"]}>
                <a href="tel:+38000490999" className={styles["catalog-drawer-phone-link"]}>
                  <MdPhoneInTalk aria-hidden="true" />
                  <span>+38 (000) 49-09-99</span>
                </a>
                <p>Щоденно з 09:00 до 21:00</p>
              </div>
            </>
          )}

          {activeCategory && (
            <>
              <div className={styles["catalog-drawer-subheader"]}>
                <button
                  type="button"
                  className={styles["catalog-drawer-back-btn"]}
                  onClick={() => setActiveCategoryId(null)}
                  aria-label="Назад до категорій"
                >
                  <IoChevronBackOutline />
                </button>
                <h3 className={styles["catalog-drawer-subtitle"]}>{activeCategory.title}</h3>
              </div>

              <ul className={styles["catalog-drawer-sub-list"]}>
                {activeCategory.items.map((name) => (
                  <li key={name}>
                    <a href="#" onClick={onClose}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileCatalogDrawer;
