import CartActionControl from "@/components/ui/CartActionControl";
import Price from "@/components/ui/Price/Price";
import styles from "./ProductSummary.module.css";

const ProductSummary = ({ product, headingAs = "h2", titleId, quantity, onQuantityChange, children }) => {
  const Heading = headingAs;
  return (
  <div className={styles.summary}>
    <p className={styles.availability}>{product.availability}</p>
    <Heading id={titleId}>{product.title}</Heading>
    <div className={styles["price-action-row"]}>
      <Price price={product.price} oldPrice={product.oldPrice} />
      <CartActionControl className={styles["action-control"]} quantity={quantity} maxQuantity={product.stock}
        onQuantityChange={onQuantityChange} tone="filled" ariaLabelAdd={`Додати в кошик: ${product.title}`} />
    </div>
    <div className={styles.description}>
      {product.description.map((line) => <p key={line}>{line}</p>)}
    </div>
    {children}
  </div>
  );
};
export default ProductSummary;
