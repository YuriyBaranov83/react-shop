import { Link } from "react-router-dom";
import CartActionControl from "@/components/ui/CartActionControl";
import Price from "@/components/ui/Price/Price";
import { formatMoney } from "@/utils/money";
import styles from "../CartPage.module.css";

const CartLineItem = ({ product, onQuantityChange }) => (
  <article className={styles["cart-card"]}>
    <Link to={`/product/${product.id}`} className={styles["cart-card-image-wrap"]} aria-label={product.title}>
      <img src={product.image} alt="" width="120" height="120" loading="lazy" decoding="async" />
    </Link>
    <div className={styles["cart-card-content"]}>
      <p className={styles["cart-card-meta"]}>{product.availability}</p>
      <h2><Link to={`/product/${product.id}`}>{product.title}</Link></h2>
      <div className={styles["cart-card-prices"]}>
        <Price price={product.price} oldPrice={product.oldPrice} className={styles["cart-card-unit-prices"]} />
        <div className={styles["cart-card-subtotal"]}>
          <strong>{formatMoney(product.price * product.quantity)}</strong>
          <span>{product.quantity} шт</span>
        </div>
      </div>
      <div className={styles["cart-card-actions"]}>
        <CartActionControl className={styles["cart-card-control"]} quantity={product.quantity}
          maxQuantity={product.stock} onQuantityChange={onQuantityChange}
          ariaLabelDecrease={`Зменшити кількість: ${product.title}`}
          ariaLabelIncrease={`Збільшити кількість: ${product.title}`} />
        <button type="button" className={styles["cart-card-remove"]}
          aria-label={`Видалити з кошика: ${product.title}`} onClick={() => onQuantityChange(0)}>Видалити</button>
      </div>
    </div>
  </article>
);
export default CartLineItem;
