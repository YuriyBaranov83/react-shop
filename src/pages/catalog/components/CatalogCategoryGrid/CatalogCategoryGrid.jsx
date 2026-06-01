import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./CatalogCategoryGrid.module.css";

const CatalogCategoryGrid = ({
  items,
  sectionTone,
  activeCategoryId,
  getCategoryHref,
}) => {
  if (!items.length) {
    return (
      <div className={styles.emptyState}>
        <p>За обраними фільтрами категорій поки немає.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <Link
          key={item.id}
          to={getCategoryHref(item.id)}
          className={clsx(
            styles.card,
            styles[`card-${sectionTone}`],
            activeCategoryId === item.id && styles["card-active"]
          )}
        >
          <span className={styles.title}>{item.title}</span>
          <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
        </Link>
      ))}
    </div>
  );
};

export default CatalogCategoryGrid;
