import { useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";

import useBodyScrollLock from "@/components/header/hooks/useBodyScrollLock";
import useEscapeKey from "@/components/header/hooks/useEscapeKey";
import CartActionControl from "@/components/ui/CartActionControl";
import styles from "./CatalogProductModal.module.css";

const CatalogProductModal = ({
  product,
  quantity,
  onQuantityChange,
  onOpenDetails,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useBodyScrollLock(Boolean(product));
  useEscapeKey(onClose, { enabled: Boolean(product) });

  const gallery = useMemo(() => product?.gallery || [], [product?.gallery]);
  const previewImage = gallery[activeImageIndex] || product?.image || "";
  const dialogTitleId = product ? `catalog-product-modal-title-${product.id}` : undefined;

  if (!product) {
    return null;
  }

  const handleOverlayMouseDown = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    onClose();
  };

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayMouseDown}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Закрити картку товару"
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        <div className={styles.body}>
          <div className={styles.media}>
            <div className={styles["preview-image-wrap"]}>
              <img src={previewImage} alt={product.title} loading="lazy" decoding="async" />
            </div>

            {gallery.length > 1 ? (
              <div className={styles.gallery}>
                {gallery.map((image, index) => (
                  <button
                    key={`${product.id}-gallery-${index + 1}`}
                    type="button"
                    className={`${styles["gallery-thumb"]} ${
                      activeImageIndex === index ? styles["gallery-thumb-active"] : ""
                    }`.trim()}
                    aria-label={`Показати фото ${index + 1}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className={styles.content}>
            <p className={styles.availability}>{product.availability}</p>
            <h2 id={dialogTitleId}>{product.title}</h2>

            <div className={styles["price-action-row"]}>
              <div className={styles.price}>
                <strong>{product.price}</strong>
                {product.oldPrice ? <span>{product.oldPrice}</span> : null}
              </div>

              <CartActionControl
                className={styles["action-control"]}
                quantity={quantity}
                onQuantityChange={onQuantityChange}
                tone="filled"
              />
            </div>

            <div className={styles.description}>
              {product.description.map((line) => (
                <p key={`${product.id}-${line}`}>{line}</p>
              ))}
            </div>

            <button type="button" className={styles.details} onClick={() => onOpenDetails?.()}>
              {product.ctaLabel} &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogProductModal;
