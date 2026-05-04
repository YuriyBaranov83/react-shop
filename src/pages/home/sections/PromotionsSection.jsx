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
    <section id="promotions" className={styles.promotions}>
      <Container>
        <SectionHeader
          title="АКЦІЇ"
          className={styles["promotions-head"]}
          actions={
            <div className={styles["promotions-head-nav"]}>
              <button
                type="button"
                className={clsx(
                  styles["promotions-nav"],
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
                  styles["promotions-nav"],
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
          className={styles["promotions-swiper"]}
        >
          {homePromotionsData.map((promo) => (
            <SwiperSlide key={promo.id} className={styles["promotions-slide"]}>
              <article
                className={clsx(
                  styles["promotions-card"],
                  styles[`promotions-card-${promo.variant}`]
                )}
                aria-disabled="true"
              >
                <div
                  className={clsx(
                    styles["promotions-content"],
                    styles[`promotions-content-${promo.variant}`]
                  )}
                >
                  <h3>{promo.title}</h3>
                  {promo.badge ? (
                    <span className={styles["promotions-badge"]}>{promo.badge}</span>
                  ) : null}
                </div>

                <img
                  className={clsx(
                    styles["promotions-image"],
                    styles[`promotions-image-${promo.variant}`]
                  )}
                  src={promo.image}
                  alt={promo.title}
                  loading="lazy"
                  decoding="async"
                />
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={clsx(
            styles["promotions-pagination"],
            "promotions-pagination",
            "swiper-pagination-brand"
          )}
        />
      </Container>
    </section>
  );
};

export default PromotionsSection;
