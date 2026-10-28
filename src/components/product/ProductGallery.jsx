import { useState } from "react";
import clsx from "clsx";
import styles from "./ProductGallery.module.css";

const ProductGallery = ({ product }) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const gallery = [...new Set(product.gallery || [product.image])];
  return (
    <div className={styles.media}>
      <div className={styles["preview-image-wrap"]}>
        <img src={activeImage} alt={product.title} width="400" height="320" decoding="async" />
      </div>
      {gallery.length > 1 && <div className={styles.gallery}>
        {gallery.map((src, index) => <button key={src} type="button"
          className={clsx(styles["gallery-thumb"], src === activeImage && styles["gallery-thumb-active"])}
          aria-label={`Показати фото ${index + 1}`} aria-pressed={src === activeImage} onClick={() => setActiveImage(src)}>
          <img src={src} alt="" width="72" height="56" loading="lazy" decoding="async" />
        </button>)}
      </div>}
    </div>
  );
};
export default ProductGallery;
