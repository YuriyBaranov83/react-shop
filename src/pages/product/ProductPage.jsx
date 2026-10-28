import { useId, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import ProductSummary from "@/components/product/ProductSummary";
import FormField from "@/components/ui/FormField/FormField";
import FormStatus from "@/components/ui/FormStatus/FormStatus";
import Button from "@/components/ui/Button/Button";
import useCart from "@/features/cart/model/useCart";
import useFavorites from "@/features/favorites/model/useFavorites";
import { getCatalogProductById, getCatalogSimilarProducts } from "@/data/catalogProductDetailsData";
import styles from "./ProductPage.module.css";

const ProductPageContent = ({ product }) => {
  const location = useLocation();
  const { getItemQuantity, setItemQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formId = useId();
  const similarProducts = getCatalogSimilarProducts(product.id, 4);
  const backHref = location.state?.from || product.categoryHref;

  return (
    <section className={styles.section}>
      <Container>
        <Breadcrumbs items={[
          { label: "Головна", to: "/" }, { label: "Каталог", to: "/catalog" },
          { label: product.categoryTitle, to: product.categoryHref }, { label: product.title },
        ]} />
        <div className={styles["product-card"]}>
          <ProductGallery product={product} />
          <ProductSummary product={product} headingAs="h1" quantity={getItemQuantity(product.id)}
            onQuantityChange={(value) => setItemQuantity(product.id, value)}>
            <Link to={backHref} className={styles["back-link"]}>Повернутися до покупок</Link>
          </ProductSummary>
        </div>
        <section className={styles["similar-section"]}>
          <h2>Схожі товари</h2>
          <div className={styles["similar-grid"]}>
            {similarProducts.map((item) => <ProductCard key={item.id} product={item}
              quantity={getItemQuantity(item.id)} onQuantityChange={(value) => setItemQuantity(item.id, value)}
              isFavorite={isFavorite(item.id)} onToggleFavorite={toggleFavorite} actionTone="filled" />)}
          </div>
        </section>
        <section className={styles["help-block"]} aria-labelledby={`${formId}-title`}>
          <div className={styles["help-copy"]}>
            <h2 id={`${formId}-title`}>Не знайшли, що шукали?</h2>
            <p>Демо-форма запиту товару. Дані не надсилаються та не зберігаються.</p>
          </div>
          <form className={styles["help-form"]} onChange={() => setIsSubmitted(false)}
            onSubmit={(event) => { event.preventDefault(); setIsSubmitted(true); }}>
            <FormField id={`${formId}-product`} label="Назва товару">
              <input id={`${formId}-product`} type="text" name="product-name" required maxLength={120} />
            </FormField>
            <FormField id={`${formId}-count`} label="Кількість">
              <input id={`${formId}-count`} type="number" name="product-count" min="1" max="999" step="1" required defaultValue="1" />
            </FormField>
            <FormField id={`${formId}-comment`} label="Коментар (необов'язково)">
              <input id={`${formId}-comment`} type="text" name="comment" maxLength={300} />
            </FormField>
            <Button type="submit">Перевірити запит</Button>
            {isSubmitted && <FormStatus>Форму заповнено коректно. Це демонстрація: запит не надіслано.</FormStatus>}
          </form>
        </section>
      </Container>
    </section>
  );
};

const ProductPage = () => {
  const { productId } = useParams();
  const product = getCatalogProductById(productId || "");
  if (!product) return <Navigate to="/404" replace />;
  return <ProductPageContent key={product.id} product={product} />;
};
export default ProductPage;
