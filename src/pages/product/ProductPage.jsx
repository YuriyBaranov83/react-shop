import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

import Container from "@/components/layout/Container";
import CartActionControl from "@/components/ui/CartActionControl";
import useCart from "@/features/cart/model/useCart";
import useFavorites from "@/features/favorites/model/useFavorites";
import {
  getCatalogProductById,
  getCatalogSimilarProducts,
} from "@/data/catalogProductDetailsData";
import CatalogProductCard from "@/pages/catalog/components/CatalogProductCard/CatalogProductCard";
import styles from "./ProductPage.module.css";

const ProductPageContent = ({
  product,
  similarProducts,
  backHref,
  onNavigateToProduct,
  getItemQuantity,
  setItemQuantity,
  isFavorite,
  toggleFavorite,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const gallery = product.gallery || [];
  const previewImage = gallery[activeImageIndex] || product.image;

  const handleHelpSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className={styles.section}>
      <Container>
        <nav className={styles.breadcrumbs} aria-label="Хлібні крихти">
          <Link to="/">Головна</Link>
          <span aria-hidden="true">/</span>
          <Link to="/catalog">Каталог</Link>
          <span aria-hidden="true">/</span>
          <Link to={product.categoryHref}>{product.categoryTitle}</Link>
          <span aria-hidden="true">/</span>
          <span>{product.title}</span>
        </nav>

        <div className={styles["product-card"]}>
          <div className={styles.media}>
            <div className={styles["preview-image-wrap"]}>
              <img src={previewImage} alt={product.title} loading="lazy" decoding="async" />
            </div>

            {gallery.length > 1 ? (
              <div className={styles.gallery}>
                {gallery.map((image, index) => (
                  <button
                    key={`${product.id}-page-gallery-${index + 1}`}
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

          <div className={styles.details}>
            <p className={styles.availability}>{product.availability}</p>
            <h1>{product.title}</h1>

            <div className={styles["price-action-row"]}>
              <div className={styles.price}>
                <strong>{product.price}</strong>
                {product.oldPrice ? <span>{product.oldPrice}</span> : null}
              </div>

              <CartActionControl
                className={styles["action-control"]}
                quantity={getItemQuantity(product.id)}
                onQuantityChange={(nextQuantity) => setItemQuantity(product.id, nextQuantity)}
                tone="filled"
              />
            </div>

            <div className={styles.description}>
              {product.description.map((line) => (
                <p key={`${product.id}-description-${line}`}>{line}</p>
              ))}
            </div>

            <Link to={backHref} className={styles["back-link"]}>
              Повернутися до категорії
            </Link>
          </div>
        </div>

        <section className={styles["similar-section"]}>
          <h2>Схожі товари</h2>
          <div className={styles["similar-grid"]}>
            {similarProducts.map((item) => (
              <CatalogProductCard
                key={item.id}
                product={item}
                quantity={getItemQuantity(item.id)}
                onQuantityChange={(nextQuantity) => setItemQuantity(item.id, nextQuantity)}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={toggleFavorite}
                onPrimaryAction={onNavigateToProduct}
                actionTone="filled"
                className={styles["similar-card"]}
              />
            ))}
          </div>
        </section>

        <section className={styles["help-block"]}>
          <div className={styles["help-copy"]}>
            <h3>Не знайшли, що шукали?</h3>
            <p>Опишіть позицію і ми підготуємо пропозицію.</p>
          </div>

          <form className={styles["help-form"]} onSubmit={handleHelpSubmit}>
            <input type="text" placeholder="Товар" name="product-name" />
            <input type="number" min="1" step="1" placeholder="Кількість" name="product-count" />
            <input type="text" placeholder="Коментар" name="comment" />
            <button type="submit">Відправити</button>
          </form>
        </section>
      </Container>
    </section>
  );
};

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getItemQuantity, setItemQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const product = useMemo(() => getCatalogProductById(productId || ""), [productId]);
  const similarProducts = useMemo(
    () => getCatalogSimilarProducts(productId || "", 4),
    [productId]
  );

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const backHref = location.state?.from || product.categoryHref;

  const handleNavigateToProduct = (nextProduct) => {
    navigate(`/product/${nextProduct.id}`, {
      state: {
        from: backHref,
      },
    });
  };

  return (
    <ProductPageContent
      key={product.id}
      product={product}
      similarProducts={similarProducts}
      backHref={backHref}
      onNavigateToProduct={handleNavigateToProduct}
      getItemQuantity={getItemQuantity}
      setItemQuantity={setItemQuantity}
      isFavorite={isFavorite}
      toggleFavorite={toggleFavorite}
    />
  );
};

export default ProductPage;
