import clsx from "clsx";
import { useState } from "react";
import styles from "./CartActionControl.module.css";

const CartActionControl = ({
  className,
  label = "В кошик",
  quantity,
  initialQuantity = 0,
  onAdd,
  onDecrease,
  onIncrease,
  onQuantityChange,
  ariaLabelAdd = "Додати в кошик",
  ariaLabelDecrease = "Зменшити кількість",
  ariaLabelIncrease = "Збільшити кількість",
}) => {
  const isControlled = typeof quantity === "number";
  const [innerQuantity, setInnerQuantity] = useState(() =>
    Math.max(0, Number(initialQuantity) || 0)
  );
  const currentQuantity = isControlled
    ? Math.max(0, Number(quantity) || 0)
    : innerQuantity;

  const updateQuantity = (nextValue) => {
    if (isControlled) {
      const nextQuantity =
        typeof nextValue === "function" ? nextValue(currentQuantity) : nextValue;
      const safeQuantity = Math.max(0, Number(nextQuantity) || 0);

      if (safeQuantity !== currentQuantity) {
        onQuantityChange?.(safeQuantity);
      }

      return;
    }

    setInnerQuantity((prevQuantity) => {
      const resolvedValue =
        typeof nextValue === "function" ? nextValue(prevQuantity) : nextValue;
      const safeQuantity = Math.max(0, Number(resolvedValue) || 0);

      if (safeQuantity !== prevQuantity) {
        onQuantityChange?.(safeQuantity);
      }

      return safeQuantity;
    });
  };

  const addToCart = () => {
    if (isControlled && onAdd) {
      onAdd();
      return;
    }

    updateQuantity((prevQuantity) => Math.max(1, prevQuantity));
  };

  const decreaseCount = () => {
    if (isControlled && onDecrease) {
      onDecrease();
      return;
    }

    updateQuantity((prevQuantity) => prevQuantity - 1);
  };

  const increaseCount = () => {
    if (isControlled && onIncrease) {
      onIncrease();
      return;
    }

    updateQuantity((prevQuantity) => prevQuantity + 1);
  };

  if (currentQuantity > 0) {
    return (
      <div className={clsx(styles["cart-action"], className)}>
        <div className={styles.counter}>
          <button type="button" aria-label={ariaLabelDecrease} onClick={decreaseCount}>
            -
          </button>
          <span>{currentQuantity}</span>
          <button type="button" aria-label={ariaLabelIncrease} onClick={increaseCount}>
            +
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles["cart-action"], className)}>
      <button type="button" className={styles["action-button"]} onClick={addToCart} aria-label={ariaLabelAdd}>
        {label}
      </button>
    </div>
  );
};

export default CartActionControl;
