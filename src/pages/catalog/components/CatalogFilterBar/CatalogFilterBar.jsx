import clsx from "clsx";
import useMediaQuery from "@/components/header/hooks/useMediaQuery";
import styles from "./CatalogFilterBar.module.css";

const CatalogFilterBar = ({ filters, activeFilterId, onFilterChange }) => {
  const isDesktop = useMediaQuery("(min-width: 981px)");
  return (
    <details className={styles["filter-disclosure"]} open={isDesktop}>
      <summary>Фільтри{activeFilterId !== "all" ? `: ${filters.find((filter) => filter.id === activeFilterId)?.label}` : ""}</summary>
    <div className={styles.filters} role="group" aria-label="Фільтри каталогу">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          aria-pressed={filter.id === activeFilterId}
          className={clsx(
            styles["filter-button"],
            filter.id === activeFilterId && styles["filter-button-active"]
          )}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
    </details>
  );
};

export default CatalogFilterBar;
