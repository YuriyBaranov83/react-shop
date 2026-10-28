import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import useBodyScrollLock from "@/components/header/hooks/useBodyScrollLock";
import styles from "./Modal.module.css";

const Modal = ({ isOpen = true, onClose, labelledBy, describedBy, overlayClassName, className, children }) => {
  const dialogRef = useRef(null);
  useBodyScrollLock(isOpen);

  useLayoutEffect(() => {
    if (!isOpen) return undefined;
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    dialog.showModal();

    return () => {
      dialog.close();
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={clsx(styles["modal-layer"], overlayClassName)}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const dialog = dialogRef.current;
        const controls = [...dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
          .filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className={clsx(styles["modal-content"], className)}>{children}</div>
    </dialog>,
    document.body
  );
};

export default Modal;
