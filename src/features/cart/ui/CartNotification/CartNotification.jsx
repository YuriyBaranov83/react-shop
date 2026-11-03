import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  IoCheckmarkOutline,
  IoCloseOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import useCart from "@/features/cart/model/useCart";
import styles from "./CartNotification.module.css";

const Notice = ({ notification, onDismiss }) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const returnFocus = useRef(null);

  useEffect(() => {
    if (hovered || focused) return undefined;
    const timeout = window.setTimeout(onDismiss, 5000);
    return () => window.clearTimeout(timeout);
  }, [hovered, focused, onDismiss]);

  return (
    <aside
      className={styles.notice}
      aria-label="Повідомлення кошика"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          returnFocus.current = event.relatedTarget;
        setFocused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <span className={styles.check}>
        <IoCheckmarkOutline aria-hidden="true" />
      </span>
      <div className={styles.copy}>
        <strong>Додано до кошика</strong>
        <p>{notification.title}</p>
        <Link to="/cart" onClick={onDismiss}>
          <span>Переглянути кошик</span>{" "}
          <IoArrowForwardOutline aria-hidden="true" />
        </Link>
      </div>
      <button
        type="button"
        className={styles.close}
        aria-label="Закрити повідомлення кошика"
        onClick={() => {
          onDismiss();
          if (
            returnFocus.current instanceof HTMLElement &&
            returnFocus.current.isConnected
          ) {
            returnFocus.current.focus({ preventScroll: true });
          }
        }}
      >
        <IoCloseOutline aria-hidden="true" />
      </button>
    </aside>
  );
};

const CartNotification = () => {
  const { notification, dismissNotification } = useCart();
  return (
    <>
      <p
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {notification ? `Додано до кошика: ${notification.title}` : ""}
      </p>
      {notification && (
        <Notice
          key={notification.sequence}
          notification={notification}
          onDismiss={dismissNotification}
        />
      )}
    </>
  );
};
export default CartNotification;
