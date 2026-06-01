import { IoHeart, IoHeartOutline } from "react-icons/io5";
import clsx from "clsx";

import CartActionControl from "@/components/ui/CartActionControl";
import styles from "./CatalogProductCard.module.css";

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

const CatalogProductCard = ({
  product,
  quantity,
  onQuantityChange,
  isFavorite,
  onToggleFavorite,
  onPrimaryAction,
  actionTone = "default",
  className,
}) => {
  const discountBadge = getDiscountBadge(product);

  const handlePrimaryAction = (event) => {
    if (!onPrimaryAction) {
      return;
    }

    onPrimaryAction(product, event.currentTarget);
  };

  return (
    <article className={clsx(styles["product-card"], className)}>
      {discountBadge ? <span className={styles["product-discount"]}>{discountBadge}</span> : null}

      <button
        type="button"
        className={styles["product-favorite"]}
        aria-label={isFavorite ? "Прибрати з обраного" : "Додати в обране"}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(product.id)}
      >
        {isFavorite ? <IoHeart /> : <IoHeartOutline />}
      </button>

      {onPrimaryAction ? (
        <button
          type="button"
          className={styles["product-image-wrap"]}
          aria-label={`Швидкий перегляд: ${product.title}`}
          onClick={handlePrimaryAction}
        >
          <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
        </button>
      ) : (
        <div className={styles["product-image-wrap"]}>
          <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
        </div>
      )}

      <p className={styles["product-availability"]}>{product.availability}</p>

      {onPrimaryAction ? (
        <button
          type="button"
          className={styles["product-title"]}
          onClick={handlePrimaryAction}
        >
          {product.title}
        </button>
      ) : (
        <h3>{product.title}</h3>
      )}

      <div className={styles["product-price-row"]}>
        <span className={styles["product-price"]}>{product.price}</span>
        {product.oldPrice ? (
          <span className={styles["product-old-price"]}>{product.oldPrice}</span>
        ) : null}
      </div>

      <div className={styles["product-action"]}>
        <CartActionControl
          className={styles["product-action-control"]}
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          tone={actionTone}
        />
      </div>
    </article>
  );
};

export default CatalogProductCard;
