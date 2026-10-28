import Container from "@/components/layout/Container";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import useCart from "@/features/cart/model/useCart";
import { getCatalogProductById } from "@/data/catalogProductDetailsData";
import CartLineItem from "./components/CartLineItem";
import CartSummary from "./components/CartSummary";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const { cartItems, clearCart, setItemQuantity } = useCart();
  const products = cartItems.map(({ id, quantity }) => ({ ...getCatalogProductById(id), quantity }));
  return (
    <section className={styles["cart-section"]}>
      <Container>
        <div className={styles["cart-header"]}>
          <h1>Кошик</h1>
          {products.length > 0 && <button type="button" className={styles["cart-clear-link"]} onClick={clearCart}>Очистити кошик</button>}
        </div>
        {products.length ? <div className={styles["cart-layout"]}>
          <div className={styles["cart-list"]}>
            {products.map((product) => <CartLineItem key={product.id} product={product}
              onQuantityChange={(value) => setItemQuantity(product.id, value)} />)}
          </div>
          <CartSummary products={products} />
        </div> : <EmptyState>Ваш кошик порожній. Додайте товари, щоб продовжити покупки.</EmptyState>}
      </Container>
    </section>
  );
};
export default CartPage;
