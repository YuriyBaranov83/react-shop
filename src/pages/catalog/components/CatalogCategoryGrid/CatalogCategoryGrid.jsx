import clsx from "clsx";
import { Link } from "react-router-dom";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import styles from "./CatalogCategoryGrid.module.css";

const toneClasses = {
  green: styles["card-green"],
  beige: styles["card-beige"],
  lilac: styles["card-lilac"],
  cyan: styles["card-cyan"],
};

const CatalogCategoryGrid = ({
  items,
  sectionTone,
  activeCategoryId,
  getCategoryHref,
  onReset,
}) => {
  if (!items.length) {
    return (
      <EmptyState onReset={onReset} actionLabel="Скинути фільтри">За обраними фільтрами категорій поки немає.</EmptyState>
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
            toneClasses[sectionTone],
            activeCategoryId === item.id && styles["card-active"]
          )}
        >
          <span className={styles.title}>{item.title}</span>
          <img src={item.image} alt="" loading="lazy" decoding="async" />
        </Link>
      ))}
    </div>
  );
};

export default CatalogCategoryGrid;
