import clsx from "clsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { homePromotionsData } from "@/data/homePromotionsData";
import styles from "./PromotionsSection.module.css";

const PromotionsSection = () => {
  return (
    <section className={styles.promotions}>
      <Container>
        <SectionHeader
          title="АКЦІЇ"
          className={styles.promotions__head}
          actions={
            <div className={styles.promotions__head_nav}>
              <button
                type="button"
                className={clsx(
                  styles.promotions__nav,
                  "slider-nav-button",
                  "promotions-nav-prev"
                )}
                aria-label="Попередні акції"
              >
                <MdChevronLeft />
              </button>
              <button
                type="button"
                className={clsx(
                  styles.promotions__nav,
                  "slider-nav-button",
                  "promotions-nav-next"
                )}
                aria-label="Наступні акції"
              >
                <MdChevronRight />
              </button>
            </div>
          }
        />

        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={4}
          spaceBetween={12}
          speed={550}
          loop={false}
          watchOverflow
          navigation={{
            prevEl: ".promotions-nav-prev",
            nextEl: ".promotions-nav-next",
          }}
          pagination={{
            el: ".promotions-pagination",
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: "auto",
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            1240: {
              slidesPerView: 4,
              spaceBetween: 12,
            },
          }}
          className={styles.promotions__swiper}
        >
          {homePromotionsData.map((promo) => (
            <SwiperSlide key={promo.id} className={styles.promotions__slide}>
              <a
                href="#"
                className={clsx(
                  styles.promotions__card,
                  styles[`promotions__card_${promo.variant}`]
                )}
              >
                <div
                  className={clsx(
                    styles.promotions__content,
                    styles[`promotions__content_${promo.variant}`]
                  )}
                >
                  <h3>{promo.title}</h3>
                  {promo.badge ? (
                    <span className={styles.promotions__badge}>{promo.badge}</span>
                  ) : null}
                </div>

                <img
                  className={clsx(
                    styles.promotions__image,
                    styles[`promotions__image_${promo.variant}`]
                  )}
                  src={promo.image}
                  alt={promo.title}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={clsx(
            styles.promotions__pagination,
            "promotions-pagination",
            "swiper-pagination-brand"
          )}
        />
      </Container>
    </section>
  );
};

export default PromotionsSection;
