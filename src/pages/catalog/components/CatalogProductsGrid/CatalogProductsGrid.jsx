import { IoHeart, IoHeartOutline } from "react-icons/io5";

import CartActionControl from "@/components/ui/CartActionControl";
import useCart from "@/features/cart/model/useCart";
import useFavorites from "@/features/favorites/model/useFavorites";
import styles from "./CatalogProductsGrid.module.css";

const parsePrice = (price = "") =>
  Number(String(price).replace(/[^\d,.-]/g, "").replace(",", "."));

const getDiscountBadge = (product) => {
  if (!product.oldPrice) {
    return null;
  }

  const oldPrice = parsePrice(product.oldPrice);
  const currentPrice = parsePrice(product.price);

  if (!Number.isFinite(oldPrice) || !Number.isFinite(currentPrice) || oldPrice <= currentPrice) {
    return null;
  }

  const discount = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  return `-${discount}%`;
};

const CatalogProductsGrid = ({ products, categoryTitle }) => {
  const { getItemQuantity, setItemQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className={styles["products-wrap"]}>
      <h2>{categoryTitle}</h2>

      {products.length > 0 ? (
        <div className={styles["products-grid"]}>
          {products.map((product) => {
            const isCurrentFavorite = isFavorite(product.id);
            const discountBadge = getDiscountBadge(product);

            return (
              <article key={product.id} className={styles["product-card"]}>
                {discountBadge ? (
                  <span className={styles["product-discount"]}>{discountBadge}</span>
                ) : null}

                <button
                  type="button"
                  className={styles["product-favorite"]}
                  aria-label={
                    isCurrentFavorite ? "Прибрати з обраного" : "Додати в обране"
                  }
                  aria-pressed={isCurrentFavorite}
                  onClick={() => toggleFavorite(product.id)}
                >
                  {isCurrentFavorite ? <IoHeart /> : <IoHeartOutline />}
                </button>

                <div className={styles["product-image-wrap"]}>
                  <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
                </div>

                <p className={styles["product-availability"]}>{product.availability}</p>
                <h3>{product.title}</h3>

                <div className={styles["product-price-row"]}>
                  <span className={styles["product-price"]}>{product.price}</span>
                  {product.oldPrice ? (
                    <span className={styles["product-old-price"]}>{product.oldPrice}</span>
                  ) : null}
                </div>

                <div className={styles["product-action"]}>
                  <CartActionControl
                    className={styles["product-action-control"]}
                    quantity={getItemQuantity(product.id)}
                    onQuantityChange={(nextQuantity) =>
                      setItemQuantity(product.id, nextQuantity)
                    }
                  />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles["empty-state"]}>
          <p>За обраними фільтрами товари поки не знайдено.</p>
        </div>
      )}
    </div>
  );
};

export default CatalogProductsGrid;
