import clsx from "clsx";
import { IoCloseOutline, IoSearch } from "react-icons/io5";
import styles from "./CatalogSearchBar.module.css";

const CatalogSearchBar = ({
  value,
  onValueChange,
  onSubmit,
  onClear,
  isCategoryScopeAvailable,
  searchScope,
  onScopeChange,
}) => {
  const hasValue = value.trim().length > 0;

  return (
    <div className={styles["search-block"]}>
      <form className={styles["search-form"]} role="search" onSubmit={onSubmit}>
        <IoSearch className={styles["search-icon"]} aria-hidden="true" />
        <input
          type="search"
          value={value}
          placeholder="Пошук товарів і категорій"
          autoComplete="off"
          onChange={(event) => onValueChange(event.target.value)}
        />

        {hasValue ? (
          <button
            type="button"
            className={styles["clear-button"]}
            aria-label="Очистити пошук"
            onClick={onClear}
          >
            <IoCloseOutline aria-hidden="true" />
          </button>
        ) : null}
      </form>

      {isCategoryScopeAvailable ? (
        <div className={styles["scope-switch"]} role="tablist" aria-label="Область пошуку">
          <button
            type="button"
            role="tab"
            aria-selected={searchScope === "category"}
            className={clsx(
              styles["scope-button"],
              searchScope === "category" && styles["scope-button-active"]
            )}
            onClick={() => onScopeChange("category")}
          >
            У цій категорії
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={searchScope === "all"}
            className={clsx(
              styles["scope-button"],
              searchScope === "all" && styles["scope-button-active"]
            )}
            onClick={() => onScopeChange("all")}
          >
            У всьому каталозі
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CatalogSearchBar;
