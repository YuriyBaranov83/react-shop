import clsx from "clsx";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import CartActionControl from "@/components/ui/CartActionControl";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import useFavorites from "@/features/favorites/model/useFavorites";
import { homeDealsData } from "@/data/homeDealsData";
import styles from "./DealsSection.module.css";

const parsePrice = (price) => Number(price.replace(/[^\d,.-]/g, "").replace(",", "."));

const getDiscountBadge = (deal) => {
  if (deal.discount && deal.discount !== "%") return deal.discount;
  if (!deal.oldPrice || !deal.price) return null;

  const oldPrice = parsePrice(deal.oldPrice);
  const currentPrice = parsePrice(deal.price);
  if (!Number.isFinite(oldPrice) || !Number.isFinite(currentPrice) || oldPrice <= currentPrice) {
    return null;
  }

  const discount = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  return `-${discount}%`;
};

const DealsSection = () => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <section className={styles.deals}>
      <Container>
        <SectionHeader
          title="ЗНИЖКИ"
          className={styles["deals-head"]}
          actions={
            <div className={styles["deals-head-nav"]}>
              <button
                type="button"
                className={clsx(styles["deals-nav"], "slider-nav-button", "deals-nav-prev")}
                aria-label="РџРѕРїРµСЂРµРґРЅС– С‚РѕРІР°СЂРё"
              >
                <MdChevronLeft />
              </button>
              <button
                type="button"
                className={clsx(styles["deals-nav"], "slider-nav-button", "deals-nav-next")}
                aria-label="РќР°СЃС‚СѓРїРЅС– С‚РѕРІР°СЂРё"
              >
                <MdChevronRight />
              </button>
            </div>
          }
        />

        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={4}
          spaceBetween={14}
          loop={false}
          speed={550}
          navigation={{
            prevEl: ".deals-nav-prev",
            nextEl: ".deals-nav-next",
          }}
          pagination={{
            el: ".deals-pagination",
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2.2,
              spaceBetween: 10,
            },
            560: {
              slidesPerView: 2.75,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 3.25,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 14,
            },
          }}
          className={styles["deals-swiper"]}
        >
          {homeDealsData.map((item) => {
            const discountBadge = getDiscountBadge(item);
            const isCurrentFavorite = isFavorite(item.id);

            return (
              <SwiperSlide key={item.id}>
                <article className={styles["deals-card"]}>
                  {discountBadge && (
                    <span className={styles["deals-discount"]}>{discountBadge}</span>
                  )}

                  <button
                    type="button"
                    className={styles["deals-favorite"]}
                    aria-label={isCurrentFavorite ? "Прибрати з обраного" : "Додати в обране"}
                    aria-pressed={isCurrentFavorite}
                    onClick={() => toggleFavorite(item.id)}
                  >
                    {isCurrentFavorite ? <IoHeart /> : <IoHeartOutline />}
                  </button>

                  <div className={styles["deals-image-wrap"]}>
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className={styles["deals-meta"]}>
                    <span>{item.meta}</span>
                    <span>{item.unitPrice}</span>
                  </div>

                  <h3>{item.title}</h3>

                  <div className={styles["deals-price-row"]}>
                    <span
                      className={clsx(
                        styles["deals-price"],
                        item.oldPrice && styles["deals-price-discount"]
                      )}
                    >
                      {item.price}
                    </span>
                    {item.oldPrice && (
                      <span className={styles["deals-old-price"]}>{item.oldPrice}</span>
                    )}
                  </div>

                  <div className={styles["deals-action"]}>
                    <CartActionControl
                      className={styles["deals-action-control"]}
                      label={item.action.label}
                    />
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div
          className={clsx(
            styles["deals-pagination"],
            "deals-pagination",
            "swiper-pagination-brand"
          )}
        />
      </Container>
    </section>
  );
};

export default DealsSection;

