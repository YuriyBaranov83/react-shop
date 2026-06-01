import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import CartActionControl from "@/components/ui/CartActionControl";
import useCart from "@/features/cart/model/useCart";
import { allProductsData } from "@/data/allProductsData";
import styles from "./CartPage.module.css";

const parsePrice = (price = "") => {
  const normalized = String(price)
    .replace(/\s/g, "")
    .replace(/[^\d,.-]/g, "")
    .replace(",", ".");
  const parsedValue = Number.parseFloat(normalized);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const formatPrice = (value) => `${value.toFixed(2).replace(".", ",")} грн`;

const PROMO_CODES = {
  VESNA10: { type: "percent", value: 10 },
  SAVE80: { type: "fixed", value: 80 },
};

const normalizePromoCode = (value = "") => value.trim().toUpperCase();

const productsById = new Map(allProductsData.map((item) => [item.id, item]));

const CartPage = () => {
  const { cartItems, clearCart, setItemQuantity } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [promoFeedback, setPromoFeedback] = useState(null);
  const [isBonusApplied, setIsBonusApplied] = useState(false);

  const cartProducts = useMemo(
    () =>
      cartItems
        .map(({ id, quantity }) => {
          const product = productsById.get(id);
          if (!product) {
            return null;
          }

          const unitPrice = parsePrice(product.price);
          const oldUnitPrice = parsePrice(product.oldPrice || product.price);
          const subtotal = unitPrice * quantity;
          const oldSubtotal = oldUnitPrice * quantity;

          return {
            ...product,
            quantity,
            subtotal,
            oldSubtotal,
          };
        })
        .filter(Boolean),
    [cartItems]
  );

  const totalAmount = useMemo(
    () => cartProducts.reduce((sum, item) => sum + item.subtotal, 0),
    [cartProducts]
  );

  const oldTotalAmount = useMemo(
    () => cartProducts.reduce((sum, item) => sum + item.oldSubtotal, 0),
    [cartProducts]
  );

  const totalQuantity = useMemo(
    () => cartProducts.reduce((sum, item) => sum + item.quantity, 0),
    [cartProducts]
  );

  const discountAmount = Math.max(0, oldTotalAmount - totalAmount);
  const bonusPoints = Math.floor(totalAmount / 20);
  const appliedPromoConfig = appliedPromoCode ? PROMO_CODES[appliedPromoCode] : null;

  const promoDiscountAmount = useMemo(() => {
    if (!appliedPromoConfig) {
      return 0;
    }

    if (appliedPromoConfig.type === "percent") {
      return Math.min(totalAmount, (totalAmount * appliedPromoConfig.value) / 100);
    }

    return Math.min(totalAmount, appliedPromoConfig.value);
  }, [appliedPromoConfig, totalAmount]);

  const subtotalAfterPromo = Math.max(0, totalAmount - promoDiscountAmount);
  const bonusDiscountAmount = isBonusApplied ? Math.min(bonusPoints, subtotalAfterPromo) : 0;
  const payableAmount = Math.max(0, subtotalAfterPromo - bonusDiscountAmount);

  const handleApplyPromo = (event) => {
    event.preventDefault();

    const normalizedCode = normalizePromoCode(promoInput);

    if (!normalizedCode) {
      setPromoFeedback({ type: "error", text: "Введіть промокод." });
      return;
    }

    if (!(normalizedCode in PROMO_CODES)) {
      setPromoFeedback({ type: "error", text: "Промокод не знайдено." });
      return;
    }

    if (normalizedCode === appliedPromoCode) {
      setPromoInput("");
      setPromoFeedback({ type: "success", text: `Промокод ${normalizedCode} уже застосовано.` });
      return;
    }

    setAppliedPromoCode(normalizedCode);
    setPromoInput("");
    setPromoFeedback({ type: "success", text: `Промокод ${normalizedCode} застосовано.` });
  };

  const clearPromo = () => {
    setAppliedPromoCode("");
    setPromoFeedback({ type: "success", text: "Промокод скасовано." });
  };

  const resetCheckoutAdjustments = () => {
    setPromoInput("");
    setAppliedPromoCode("");
    setPromoFeedback(null);
    setIsBonusApplied(false);
  };

  const handleClearCart = () => {
    clearCart();
    resetCheckoutAdjustments();
  };

  const handleItemQuantityChange = (itemId, nextQuantity) => {
    if (nextQuantity === 0 && cartProducts.length === 1) {
      resetCheckoutAdjustments();
    }

    setItemQuantity(itemId, nextQuantity);
  };

  return (
    <section className={styles["cart-section"]}>
      <Container>
        <div className={styles["cart-header"]}>
          <h1>Кошик</h1>

          {cartProducts.length > 0 && (
            <button
              type="button"
              className={styles["cart-clear-link"]}
              onClick={handleClearCart}
            >
              Очистити
            </button>
          )}
        </div>

        {cartProducts.length > 0 ? (
          <div className={styles["cart-layout"]}>
            <div className={styles["cart-list"]}>
              {cartProducts.map((item) => (
                <article key={item.id} className={styles["cart-card"]}>
                  <div className={styles["cart-card-image-wrap"]}>
                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                  </div>

                  <div className={styles["cart-card-content"]}>
                    <p className={styles["cart-card-meta"]}>{item.meta}</p>
                    <h2>{item.title}</h2>

                    <div className={styles["cart-card-prices"]}>
                      <div className={styles["cart-card-unit-prices"]}>
                        <span className={styles["cart-card-price"]}>{item.price}</span>
                        {item.oldPrice && (
                          <span className={styles["cart-card-old-price"]}>{item.oldPrice}</span>
                        )}
                      </div>

                      <div className={styles["cart-card-subtotal"]}>
                        <strong>{formatPrice(item.subtotal)}</strong>
                        <span>{item.quantity} {"шт"}</span>
                      </div>
                    </div>

                    <div className={styles["cart-card-actions"]}>
                      <CartActionControl
                        className={styles["cart-card-control"]}
                        quantity={item.quantity}
                        onQuantityChange={(nextQuantity) => handleItemQuantityChange(item.id, nextQuantity)}
                      />

                      <button
                        type="button"
                        className={styles["cart-card-remove"]}
                        onClick={() => handleItemQuantityChange(item.id, 0)}
                      >
                        Видалити
                      </button>
                    </div>
                  </div>

                </article>
              ))}
            </div>

            <aside className={styles["cart-summary"]}>
              <div className={styles["cart-summary-delivery"]}>
                <p className={styles["cart-summary-delivery-title"]}>Доставка сьогодні, 18:11</p>
                <button type="button">Змінити</button>
              </div>

              <p className={styles["cart-summary-address"]}>
                {"вул. Хрещатик, 22, м. Київ"}
              </p>

              <form
                className={styles["cart-summary-promo"]}
                onSubmit={handleApplyPromo}
              >
                <label htmlFor="cart-promo" className={styles["visually-hidden"]}>
                  Промокод
                </label>
                <input
                  id="cart-promo"
                  type="text"
                  placeholder="Є промокод?"
                  value={promoInput}
                  onChange={(event) => setPromoInput(event.target.value)}
                />
                <button type="submit">Застосувати</button>
              </form>

              {promoFeedback && (
                <p
                  className={`${styles["cart-summary-promo-feedback"]} ${
                    promoFeedback.type === "error"
                      ? styles["cart-summary-promo-feedback-error"]
                      : styles["cart-summary-promo-feedback-success"]
                  }`}
                >
                  {promoFeedback.text}
                </p>
              )}

              {appliedPromoCode && (
                <button
                  type="button"
                  className={styles["cart-summary-promo-clear"]}
                  onClick={clearPromo}
                >
                  Скасувати промокод {appliedPromoCode}
                </button>
              )}

              <button
                type="button"
                className={`${styles["cart-summary-bonuses"]} ${
                  isBonusApplied ? styles["cart-summary-bonuses-active"] : ""
                }`.trim()}
                onClick={() => setIsBonusApplied((prevValue) => !prevValue)}
                aria-pressed={isBonusApplied}
              >
                <span aria-hidden="true" />
                <strong>Списати бонуси</strong>
                <span>Всього {bonusPoints} бонусів</span>
              </button>

              <dl className={styles["cart-summary-list"]}>
                <div>
                  <dt>Товари ({totalQuantity})</dt>
                  <dd>{formatPrice(totalAmount)}</dd>
                </div>
                <div>
                  <dt>Знижки</dt>
                  <dd className={styles["cart-summary-accent"]}>
                    {discountAmount > 0 ? `-${formatPrice(discountAmount)}` : "0 грн"}
                  </dd>
                </div>
                <div>
                  <dt>Бонуси</dt>
                  <dd className={styles["cart-summary-accent"]}>
                    {bonusDiscountAmount > 0 ? `-${formatPrice(bonusDiscountAmount)}` : "0 грн"}
                  </dd>
                </div>
                <div>
                  <dt>Промокод</dt>
                  <dd className={styles["cart-summary-accent"]}>
                    {promoDiscountAmount > 0 ? `-${formatPrice(promoDiscountAmount)}` : "0 грн"}
                  </dd>
                </div>
                <div>
                  <dt>Доставка</dt>
                  <dd>Безкоштовно</dd>
                </div>
              </dl>

              <div className={styles["cart-summary-total"]}>
                <span>До сплати</span>
                <strong>{formatPrice(payableAmount)}</strong>
              </div>

              <button type="button" className={styles["cart-summary-submit"]}>
                Оформити замовлення
              </button>

              <button
                type="button"
                className={styles["cart-summary-clear"]}
                onClick={handleClearCart}
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

