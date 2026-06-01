import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useCart from "@/features/cart/model/useCart";
import useFavorites from "@/features/favorites/model/useFavorites";
import { getCatalogProductById } from "@/data/catalogProductDetailsData";
import CatalogProductCard from "../CatalogProductCard/CatalogProductCard";
import CatalogProductModal from "../CatalogProductModal/CatalogProductModal";
import styles from "./CatalogProductsGrid.module.css";

const CatalogProductsGrid = ({ products, categoryTitle }) => {
  const { getItemQuantity, setItemQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeProductId, setActiveProductId] = useState(null);
  const openerButtonRef = useRef(null);

  const activeProduct = useMemo(
    () => (activeProductId ? getCatalogProductById(activeProductId) : null),
    [activeProductId]
  );

  const handleOpenPreview = useCallback((product, openerButton) => {
    openerButtonRef.current = openerButton;
    setActiveProductId(product.id);
  }, []);

  const handleClosePreview = useCallback(() => {
    setActiveProductId(null);
  }, []);

  useEffect(() => {
    if (activeProductId !== null) {
      return;
    }

    openerButtonRef.current?.focus?.();
  }, [activeProductId]);

  const handleOpenDetails = useCallback(() => {
    if (!activeProductId) {
      return;
    }

    navigate(`/product/${activeProductId}`, {
      state: {
        from: `${location.pathname}${location.search}`,
      },
    });

    setActiveProductId(null);
  }, [activeProductId, location.pathname, location.search, navigate]);

  return (
    <div className={styles["products-wrap"]}>
      <h2>{categoryTitle}</h2>

      {products.length > 0 ? (
        <div className={styles["products-grid"]}>
          {products.map((product) => (
            <CatalogProductCard
              key={product.id}
              product={product}
              quantity={getItemQuantity(product.id)}
              onQuantityChange={(nextQuantity) => setItemQuantity(product.id, nextQuantity)}
              isFavorite={isFavorite(product.id)}
              onToggleFavorite={toggleFavorite}
              onPrimaryAction={handleOpenPreview}
            />
          ))}
        </div>
      ) : (
        <div className={styles["empty-state"]}>
          <p>За обраними фільтрами товари поки не знайдено.</p>
        </div>
      )}

      <CatalogProductModal
        product={activeProduct}
        quantity={activeProduct ? getItemQuantity(activeProduct.id) : 0}
        onQuantityChange={(nextQuantity) => {
          if (!activeProduct) {
            return;
          }

          setItemQuantity(activeProduct.id, nextQuantity);
        }}
        onClose={handleClosePreview}
        onOpenDetails={handleOpenDetails}
      />
    </div>
  );
};

export default CatalogProductsGrid;
