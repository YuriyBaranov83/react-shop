import clsx from "clsx";
import { useLayoutEffect, useRef } from "react";
import styles from "./CartActionControl.module.css";

const CartActionControl = ({
  className, label = "В кошик", quantity = 0, maxQuantity = Infinity,
  tone = "default", onQuantityChange,
  ariaLabelAdd = "Додати в кошик",
  ariaLabelDecrease = "Зменшити кількість",
  ariaLabelIncrease = "Збільшити кількість",
}) => {
  const controlRef = useRef(null);
  const restoreFocusRef = useRef(false);
  const currentQuantity = Number.isFinite(quantity) ? Math.max(0, Math.floor(quantity)) : 0;

  useLayoutEffect(() => {
    if (restoreFocusRef.current) {
      controlRef.current?.querySelector("button:not([disabled])")?.focus({ preventScroll: true });
      restoreFocusRef.current = false;
    }
  }, [currentQuantity]);

  const updateQuantity = (nextQuantity) => {
    restoreFocusRef.current = nextQuantity === 0 || currentQuantity === 0;
    onQuantityChange?.(Math.min(maxQuantity, Math.max(0, nextQuantity)));
  };

  return (
    <div ref={controlRef} className={clsx(styles["cart-action"], className)}>
      {currentQuantity > 0 ? (
        <div className={clsx(styles.counter, tone === "filled" && styles["counter-filled"])}>
          <button type="button" aria-label={ariaLabelDecrease} onClick={() => updateQuantity(currentQuantity - 1)}>−</button>
          <output aria-live="polite" aria-label="Кількість">{currentQuantity}</output>
          <button type="button" aria-label={ariaLabelIncrease} disabled={currentQuantity >= maxQuantity}
            onClick={() => updateQuantity(currentQuantity + 1)}>+</button>
        </div>
      ) : (
        <button type="button" className={clsx(styles["action-button"], tone === "filled" && styles["action-button-filled"])}
          disabled={maxQuantity <= 0} onClick={() => updateQuantity(1)} aria-label={ariaLabelAdd}>
          {maxQuantity <= 0 ? "Немає в наявності" : label}
        </button>
      )}
    </div>
  );
};
export default CartActionControl;
