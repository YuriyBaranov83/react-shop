import { Link, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Modal from "@/components/ui/Modal/Modal";
import ProductGallery from "@/components/product/ProductGallery";
import ProductSummary from "@/components/product/ProductSummary";
import styles from "./CatalogProductModal.module.css";

const CatalogProductModal = ({ product, quantity, onQuantityChange, onClose }) => {
  const location = useLocation();
  if (!product) return null;
  const titleId = `catalog-product-modal-title-${product.id}`;
  return (
    <Modal labelledBy={titleId} onClose={onClose} overlayClassName={styles.overlay} className={styles.dialog}>
      <button type="button" className={styles.close} aria-label="Закрити картку товару" onClick={onClose}>
        <IoMdClose aria-hidden="true" />
      </button>
      <div className={styles.body}>
        <ProductGallery key={product.id} product={product} />
        <ProductSummary product={product} titleId={titleId} quantity={quantity} onQuantityChange={onQuantityChange}>
          <Link to={`/product/${product.id}`} state={{ from: `${location.pathname}${location.search}` }}
            className={styles.details} onClick={onClose}>Детальніше про товар</Link>
        </ProductSummary>
      </div>
    </Modal>
  );
};
export default CatalogProductModal;
