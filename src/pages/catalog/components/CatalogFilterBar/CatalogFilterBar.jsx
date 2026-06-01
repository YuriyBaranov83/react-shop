import clsx from "clsx";
import styles from "./CatalogFilterBar.module.css";

const CatalogFilterBar = ({ filters, activeFilterId, onFilterChange }) => {
  return (
    <div className={styles.filters} role="tablist" aria-label="Фільтри каталогу">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          role="tab"
          aria-selected={filter.id === activeFilterId}
          className={clsx(
            styles.filterButton,
            filter.id === activeFilterId && styles["filterButton-active"]
          )}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default CatalogFilterBar;
