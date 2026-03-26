import { useMemo } from "react";
import { Link } from "react-router-dom";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import Container from "@/components/layout/Container";
import CartActionControl from "@/components/ui/CartActionControl";
import useCart from "@/features/cart/model/useCart";
import useFavorites from "@/features/favorites/model/useFavorites";
import { homeDealsData } from "@/data/homeDealsData";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { getItemQuantity, setItemQuantity } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const visibleFavorites = useMemo(
    () => homeDealsData.filter((item) => favoriteIds.includes(item.id)),
    [favoriteIds]
  );

  return (
    <section className={styles["favorites-section"]}>
      <Container>
        <h1>Обране</h1>
        <p className={styles["favorites-lead"]}>
          Зберігайте товари, щоб швидко повернутися до них перед оформленням замовлення.
        </p>

        <div className={styles["favorites-tabs"]} role="tablist" aria-label="Розділи кабінету">
          <button
            type="button"
            role="tab"
            aria-selected="false"
            disabled
            className={styles["favorites-tab"]}
          >
            Особисті дані
          </button>
          <button
            type="button"
            role="tab"
            aria-selected="false"
            disabled
            className={styles["favorites-tab"]}
          >
            Історія замовлень
          </button>
          <button
            type="button"
            role="tab"
            aria-selected="true"
            className={`${styles["favorites-tab"]} ${styles["favorites-tab-active"]}`.trim()}
          >
            Обране
          </button>
        </div>

        {visibleFavorites.length > 0 ? (
          <div className={styles["favorites-grid"]}>
            {visibleFavorites.map((item) => (
              <article key={item.id} className={styles["favorite-card"]}>
                {item.discount && (
                  <span className={styles["favorite-discount"]}>{item.discount}</span>
                )}

                <button
                  type="button"
                  className={styles["favorite-toggle"]}
                  aria-label="Прибрати з обраного"
                  aria-pressed="true"
                  onClick={() => toggleFavorite(item.id)}
                >
                  <IoHeart aria-hidden="true" />
                </button>

                <div className={styles["favorite-image-wrap"]}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <p className={styles["favorite-availability"]}>{item.meta}</p>
                <h2>{item.title}</h2>

                <div className={styles["favorite-price-row"]}>
                  <span className={styles["favorite-price"]}>{item.price}</span>
                  {item.oldPrice && (
                    <span className={styles["favorite-old-price"]}>{item.oldPrice}</span>
                  )}
                </div>

                <div className={styles["favorite-action"]}>
                  <CartActionControl
                    className={styles["favorite-action-control"]}
                    label={item.action.label}
                    quantity={getItemQuantity(item.id)}
                    onQuantityChange={(nextQuantity) =>
                      setItemQuantity(item.id, nextQuantity)
                    }
                  />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles["favorites-empty"]}>
            <span className={styles["favorites-empty-icon"]} aria-hidden="true">
              <IoHeartOutline />
            </span>
            <p>У вас поки немає товарів в обраному.</p>
            <Link to="/">Перейти до покупок</Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FavoritesPage;
