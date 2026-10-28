import Container from "@/components/layout/Container";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import useCart from "@/features/cart/model/useCart";
import useFavorites from "@/features/favorites/model/useFavorites";
import { getCatalogProductsByIds } from "@/data/catalogProductDetailsData";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { getItemQuantity, setItemQuantity } = useCart();
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const products = getCatalogProductsByIds(favoriteIds);
  return (
    <section className={`${styles["favorites-main"]} ${styles["favorites-section"]}`}>
      <Container>
        <h1>Обране</h1>
        <p className={styles["favorites-lead"]}>Зберігайте товари, щоб швидко повернутися до них перед покупкою.</p>
        {products.length ? <div className={styles["favorites-grid"]}>
          {products.map((product) => <ProductCard key={product.id} product={product}
            quantity={getItemQuantity(product.id)} onQuantityChange={(value) => setItemQuantity(product.id, value)}
            isFavorite={isFavorite(product.id)} onToggleFavorite={toggleFavorite} />)}
        </div> : <EmptyState>У вас поки немає товарів в обраному. Додайте позиції з каталогу.</EmptyState>}
      </Container>
    </section>
  );
};
export default FavoritesPage;
