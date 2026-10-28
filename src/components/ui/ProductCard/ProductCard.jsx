import { Link, useLocation } from "react-router-dom";
import { IoHeart, IoHeartOutline, IoEyeOutline } from "react-icons/io5";
import clsx from "clsx";
import CartActionControl from "@/components/ui/CartActionControl";
import Price from "@/components/ui/Price/Price";
import { getDiscountPercent } from "@/utils/money";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, quantity, onQuantityChange, isFavorite, onToggleFavorite, onPreview, actionTone = "default", compact = false, className }) => {
  const location = useLocation();
  const discount = getDiscountPercent(product.price, product.oldPrice);
  const productHref = `/product/${product.id}`;
  const from = { from: `${location.pathname}${location.search}` };

  return (
    <article className={clsx(styles["product-card"], compact && styles["product-card-compact"], className)}>
      {discount > 0 && <span className={styles["product-discount"]}>-{discount}%</span>}
      <button
        type="button"
        className={styles["product-favorite"]}
        aria-label={`${isFavorite ? "Прибрати з обраного" : "Додати в обране"}: ${product.title}`}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(product.id)}
      >
        {isFavorite ? <IoHeart aria-hidden="true" /> : <IoHeartOutline aria-hidden="true" />}
      </button>
      <Link to={productHref} state={from} className={styles["product-image-wrap"]} aria-label={product.title}>
        <img src={product.image} alt="" loading="lazy" decoding="async" width="320" height="240" />
      </Link>
      {onPreview && (
        <button type="button" className={styles["product-preview"]} aria-haspopup="dialog"
          aria-label={`Швидкий перегляд: ${product.title}`} onClick={(event) => onPreview(product, event.currentTarget)}>
          <IoEyeOutline aria-hidden="true" /> Перегляд
        </button>
      )}
      <p className={styles["product-availability"]}>{product.availability}</p>
      <h3><Link to={productHref} state={from}>{product.title}</Link></h3>
      <Price price={product.price} oldPrice={product.oldPrice} className={styles["product-price-row"]} />
      <div className={styles["product-action"]}>
        <CartActionControl
          quantity={quantity} maxQuantity={product.stock} onQuantityChange={onQuantityChange} tone={actionTone}
          ariaLabelAdd={`Додати в кошик: ${product.title}`}
          ariaLabelDecrease={`Зменшити кількість: ${product.title}`}
          ariaLabelIncrease={`Збільшити кількість: ${product.title}`}
        />
      </div>
    </article>
  );
};

export default ProductCard;
