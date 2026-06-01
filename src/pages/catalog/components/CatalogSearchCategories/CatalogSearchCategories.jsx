import { Link } from "react-router-dom";
import styles from "./CatalogSearchCategories.module.css";

const CatalogSearchCategories = ({ categories }) => {
  if (!categories.length) {
    return null;
  }

  return (
    <section className={styles["categories-wrap"]} aria-label="Знайдені категорії">
      <h3>Знайдені категорії</h3>
      <div className={styles["categories-grid"]}>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.href}
            className={styles["category-card"]}
          >
            <span className={styles["category-section"]}>{category.sectionLabel}</span>
            <strong>{category.title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CatalogSearchCategories;
