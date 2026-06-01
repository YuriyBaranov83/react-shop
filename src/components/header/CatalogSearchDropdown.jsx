import styles from "./CatalogSearchDropdown.module.css";

const CatalogSearchDropdown = ({
  query,
  minLength,
  popularProducts,
  productResults,
  categoryResults,
  onProductSelect,
  onCategorySelect,
  onShowAllResults,
}) => {
  const normalizedQuery = query.trim();
  const hasQuery = normalizedQuery.length > 0;
  const canSearch = normalizedQuery.length >= minLength;

  return (
    <div className={styles["search-dropdown"]} role="region" aria-label="Пошукові підказки">
      <p className={styles["search-demo-note"]}>
        Пошук працює в демо-режимі за товарами каталогу.
      </p>

      {hasQuery && !canSearch ? (
        <p className={styles["search-note"]}>Введіть щонайменше 2 символи.</p>
      ) : null}

      {!hasQuery ? (
        <section className={styles["result-section"]}>
          <h3>Популярні товари</h3>
          <div className={styles["products-grid"]}>
            {popularProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                className={styles["product-card"]}
                onClick={() => onProductSelect(product.id)}
              >
                <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
                <span className={styles["product-title"]}>{product.title}</span>
                <span className={styles["product-price"]}>{product.price}</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {hasQuery && canSearch ? (
        <>
          <section className={styles["result-section"]}>
            <h3>Товари</h3>
            {productResults.length > 0 ? (
              <div className={styles["products-grid"]}>
                {productResults.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className={styles["product-card"]}
                    onClick={() => onProductSelect(product.id)}
                  >
                    <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
                    <span className={styles["product-title"]}>{product.title}</span>
                    <span className={styles["product-price"]}>{product.price}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className={styles["empty-text"]}>Товари не знайдено.</p>
            )}
          </section>

          <section className={styles["result-section"]}>
            <h3>Категорії</h3>
            {categoryResults.length > 0 ? (
              <div className={styles["categories-list"]}>
                {categoryResults.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={styles["category-item"]}
                    onClick={() => onCategorySelect(category.href)}
                  >
                    <span>{category.title}</span>
                    <small>{category.sectionLabel}</small>
                  </button>
                ))}
              </div>
            ) : (
              <p className={styles["empty-text"]}>Категорії не знайдено.</p>
            )}
          </section>

          <button
            type="button"
            className={styles["all-results-button"]}
            onClick={onShowAllResults}
          >
            Показати всі результати
          </button>
        </>
      ) : null}
    </div>
  );
};

export default CatalogSearchDropdown;
