import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./CatalogSidebar.module.css";

const CatalogSidebar = ({
  sections,
  activeSectionId,
  activeCategoryId,
  getSectionHref,
  getCategoryHref,
}) => {
  return (
    <aside className={styles.sidebar} aria-label="Категорії каталогу">
      <h2>Каталог</h2>

      <ul className={styles.list}>
        {sections.map((section) => {
          const isActiveSection = section.id === activeSectionId;

          return (
            <li key={section.id} className={styles.item}>
              <Link
                to={getSectionHref(section.id)}
                className={clsx(
                  styles.sectionLink,
                  isActiveSection && styles["sectionLink-active"]
                )}
              >
                {section.sidebarLabel}
              </Link>

              {isActiveSection ? (
                <ul className={styles.subList}>
                  {section.items.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={getCategoryHref(section.id, category.id)}
                        className={clsx(
                          styles.subLink,
                          activeCategoryId === category.id && styles["subLink-active"]
                        )}
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default CatalogSidebar;
