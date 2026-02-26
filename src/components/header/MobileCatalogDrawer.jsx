import { useMemo, useState } from "react";
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { catalogData } from "@/data/catalogData";
import styles from "./header.module.css";

const MobileCatalogDrawer = ({ onClose }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const activeCategory = useMemo(
    () => catalogData.find((item) => item.id === activeCategoryId),
    [activeCategoryId]
  );

  return (
    <div
      className={styles.catalog__drawer_overlay}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={styles.catalog__drawer}>
        <div className={styles.catalog__drawer_header}>
          {activeCategory ? (
            <button
              type="button"
              className={styles.catalog__drawer_icon_btn}
              onClick={() => setActiveCategoryId(null)}
              aria-label="Назад до категорій"
            >
              <IoChevronBackOutline />
            </button>
          ) : (
            <span className={styles.catalog__drawer_spacer} aria-hidden="true" />
          )}

          <div className={styles.catalog__drawer_title}>
            {activeCategory ? activeCategory.title : "Каталог"}
          </div>

          <button
            type="button"
            className={styles.catalog__drawer_icon_btn}
            onClick={onClose}
            aria-label="Закрити меню"
          >
            <IoCloseOutline />
          </button>
        </div>

        {!activeCategory && (
          <ul className={styles.catalog__drawer_list}>
            {catalogData.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  className={styles.catalog__drawer_item}
                  onClick={() => setActiveCategoryId(category.id)}
                >
                  <span>{category.title}</span>
                  <IoChevronForwardOutline />
                </button>
              </li>
            ))}
          </ul>
        )}

        {activeCategory && (
          <ul className={styles.catalog__drawer_sub_list}>
            {activeCategory.items.map((name) => (
              <li key={name}>
                <a href="#" onClick={onClose}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MobileCatalogDrawer;
