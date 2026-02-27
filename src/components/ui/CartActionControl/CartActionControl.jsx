import clsx from "clsx";
import { useState } from "react";
import styles from "./CartActionControl.module.css";

const CartActionControl = ({
  className,
  label = "В кошик",
  initialQuantity = 0,
  onQuantityChange,
  ariaLabelAdd = "Додати в кошик",
  ariaLabelDecrease = "Зменшити кількість",
  ariaLabelIncrease = "Збільшити кількість",
}) => {
  const [quantity, setQuantity] = useState(() => Math.max(0, Number(initialQuantity) || 0));

  const updateQuantity = (nextValue) => {
    setQuantity((prevQuantity) => {
      const nextQuantity =
        typeof nextValue === "function" ? nextValue(prevQuantity) : nextValue;
      const safeQuantity = Math.max(0, Number(nextQuantity) || 0);

      if (safeQuantity !== prevQuantity) {
        onQuantityChange?.(safeQuantity);
      }

      return safeQuantity;
    });
  };

  const addToCart = () => updateQuantity((prevQuantity) => Math.max(1, prevQuantity));
  const decreaseCount = () => updateQuantity((prevQuantity) => prevQuantity - 1);
  const increaseCount = () => updateQuantity((prevQuantity) => prevQuantity + 1);

  if (quantity > 0) {
    return (
      <div className={clsx(styles.cartAction, className)}>
        <div className={styles.counter}>
          <button type="button" aria-label={ariaLabelDecrease} onClick={decreaseCount}>
            -
          </button>
          <span>{quantity}</span>
          <button type="button" aria-label={ariaLabelIncrease} onClick={increaseCount}>
            +
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.cartAction, className)}>
      <button type="button" className={styles.actionButton} onClick={addToCart} aria-label={ariaLabelAdd}>
        {label}
      </button>
    </div>
  );
};

export default CartActionControl;
