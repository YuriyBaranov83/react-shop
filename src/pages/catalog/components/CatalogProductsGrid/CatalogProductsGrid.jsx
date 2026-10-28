import { useCallback, useState } from "react";
import useCart from "@/features/cart/model/useCart";
import useFavorites from "@/features/favorites/model/useFavorites";
import { getCatalogProductById } from "@/data/catalogProductDetailsData";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import CatalogProductModal from "../CatalogProductModal/CatalogProductModal";
import styles from "./CatalogProductsGrid.module.css";

const CatalogProductsGrid = ({ products, categoryTitle, onReset }) => {
  const { getItemQuantity, setItemQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeProductId, setActiveProductId] = useState(null);
  const activeProduct = activeProductId ? getCatalogProductById(activeProductId) : null;
  const closePreview = useCallback(() => setActiveProductId(null), []);

  return (
    <div className={styles["products-wrap"]}>
      <h2>{categoryTitle}</h2>
      <p className={styles["results-count"]} role="status">Знайдено товарів: {products.length}</p>
      {products.length ? <div className={styles["products-grid"]}>
        {products.map((product) => <ProductCard key={product.id} product={product}
          quantity={getItemQuantity(product.id)} onQuantityChange={(value) => setItemQuantity(product.id, value)}
          isFavorite={isFavorite(product.id)} onToggleFavorite={toggleFavorite}
          onPreview={(item) => setActiveProductId(item.id)} />)}
      </div> : <EmptyState onReset={onReset} actionLabel="Скинути пошук і фільтри">За обраними умовами товари не знайдено.</EmptyState>}
      <CatalogProductModal product={activeProduct} quantity={activeProduct ? getItemQuantity(activeProduct.id) : 0}
        onQuantityChange={(value) => { if (activeProduct) setItemQuantity(activeProduct.id, value); }}
        onClose={closePreview} />
    </div>
  );
};
export default CatalogProductsGrid;
