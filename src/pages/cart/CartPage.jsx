import { useMemo } from "react";
import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import CartActionControl from "@/components/ui/CartActionControl";
import useCart from "@/features/cart/model/useCart";
import { homeDealsData } from "@/data/homeDealsData";
import styles from "./CartPage.module.css";

const parsePrice = (price) => Number(price.replace(/[^\d,.-]/g, "").replace(",", "."));
const formatPrice = (value) => `${value.toFixed(2).replace(".", ",")} грн`;

const productsById = new Map(homeDealsData.map((item) => [item.id, item]));

const CartPage = () => {
  const { cartItems, clearCart, setItemQuantity } = useCart();

  const cartProducts = useMemo(
    () =>
      cartItems
        .map(({ id, quantity }) => {
          const product = productsById.get(id);
          if (!product) {
            return null;
          }

          const unitPrice = parsePrice(product.price);
          const subtotal = unitPrice * quantity;

          return {
            ...product,
            quantity,
            subtotal,
          };
        })
        .filter(Boolean),
    [cartItems]
  );

  const totalAmount = useMemo(
    () => cartProducts.reduce((sum, item) => sum + item.subtotal, 0),
    [cartProducts]
  );

  const totalQuantity = useMemo(
    () => cartProducts.reduce((sum, item) => sum + item.quantity, 0),
    [cartProducts]
  );

  return (
    <section className={styles["cart-section"]}>
      <Container>
        <h1>Кошик</h1>

        {cartProducts.length > 0 ? (
          <div className={styles["cart-layout"]}>
            <div className={styles["cart-list"]}>
              {cartProducts.map((item) => (
                <article key={item.id} className={styles["cart-card"]}>
                  <div className={styles["cart-card-image-wrap"]}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className={styles["cart-card-content"]}>
                    <p className={styles["cart-card-meta"]}>{item.meta}</p>
                    <h2>{item.title}</h2>

                    <div className={styles["cart-card-prices"]}>
                      <span className={styles["cart-card-price"]}>{item.price}</span>
                      {item.oldPrice && (
                        <span className={styles["cart-card-old-price"]}>{item.oldPrice}</span>
                      )}
                    </div>

                    <div className={styles["cart-card-actions"]}>
                      <CartActionControl
                        className={styles["cart-card-control"]}
                        quantity={item.quantity}
                        onQuantityChange={(nextQuantity) =>
                          setItemQuantity(item.id, nextQuantity)
                        }
                      />

                      <button
                        type="button"
                        className={styles["cart-card-remove"]}
                        onClick={() => setItemQuantity(item.id, 0)}
                      >
                        Видалити
                      </button>
                    </div>
                  </div>

                  <div className={styles["cart-card-subtotal"]}>
                    {formatPrice(item.subtotal)}
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles["cart-summary"]}>
              <h3>Підсумок</h3>
              <p>
                Товарів: <strong>{totalQuantity}</strong>
              </p>
              <p>
                До сплати: <strong>{formatPrice(totalAmount)}</strong>
              </p>

              <button
                type="button"
                className={styles["cart-summary-clear"]}
                onClick={clearCart}
              >
                Очистити кошик
              </button>
            </aside>
          </div>
        ) : (
          <div className={styles["cart-empty"]}>
            <p>Ваш кошик порожній. Додайте товари з розділу акцій.</p>
            <Link to="/">Перейти до акцій</Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default CartPage;
