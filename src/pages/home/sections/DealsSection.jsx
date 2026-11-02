import clsx from "clsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import useMediaQuery from "@/components/header/hooks/useMediaQuery";
import useCart from "@/features/cart/model/useCart";
import useFavorites from "@/features/favorites/model/useFavorites";
import { homeDealsData } from "@/data/homeDealsData";
import { sliderA11y } from "@/data/sliderA11y";
import styles from "./DealsSection.module.css";

const DealsSection = () => {
  const { getItemQuantity, setItemQuantity } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <section className={styles.deals}>
      <Container>
        <SectionHeader
          title="Вигідно цього тижня"
          linkHref="/catalog?filter=sale"
          linkLabel="Усі знижки"
          className={styles["deals-head"]}
          actions={
            <div className={styles["deals-head-nav"]}>
              <button
                type="button"
                className={clsx(
                  styles["deals-nav"],
                  "slider-nav-button",
                  "deals-nav-prev",
                )}
                aria-label="Попередні товари"
              >
                <MdChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className={clsx(
                  styles["deals-nav"],
                  "slider-nav-button",
                  "deals-nav-next",
                )}
                aria-label="Наступні товари"
              >
                <MdChevronRight aria-hidden="true" />
              </button>
            </div>
          }
        />
        <Swiper
          modules={[A11y, Navigation, Pagination]}
          a11y={sliderA11y}
          slidesPerView="auto"
          spaceBetween={14}
          loop={false}
          speed={reducedMotion ? 0 : 550}
          navigation={{ prevEl: ".deals-nav-prev", nextEl: ".deals-nav-next" }}
          pagination={{ el: ".deals-pagination", clickable: true }}
          className={styles["deals-swiper"]}
        >
          {homeDealsData.map((product) => (
            <SwiperSlide key={product.id} className={styles["deals-slide"]}>
              <ProductCard
                product={product}
                quantity={getItemQuantity(product.id)}
                compact
                onQuantityChange={(value) => setItemQuantity(product.id, value)}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={clsx(
            styles["deals-pagination"],
            "deals-pagination",
            "swiper-pagination-brand",
          )}
        />
      </Container>
    </section>
  );
};
export default DealsSection;
