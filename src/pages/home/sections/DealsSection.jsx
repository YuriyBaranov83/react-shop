import clsx from "clsx";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import CartActionControl from "@/components/ui/CartActionControl";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
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
  const [deals, setDeals] = useState(() =>
    homeDealsData.map((item) => ({ ...item, isFavorite: Boolean(item.isFavorite) }))
  );

  const toggleFavorite = (id) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === id ? { ...deal, isFavorite: !deal.isFavorite } : deal
      )
    );
  };

  return (
    <section className={styles.deals}>
      <Container>
        <SectionHeader
          title="АКЦІЇ"
          className={styles.deals__head}
          actions={
            <div className={styles.deals__head_nav}>
              <button
                type="button"
                className={clsx(styles.deals__nav, "deals-nav-prev")}
                aria-label="Попередні товари"
              >
                <MdChevronLeft />
              </button>
              <button
                type="button"
                className={clsx(styles.deals__nav, "deals-nav-next")}
                aria-label="Наступні товари"
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
          className={styles.deals__swiper}
        >
          {deals.map((item) => {
            const discountBadge = getDiscountBadge(item);

            return (
              <SwiperSlide key={item.id}>
                <article className={styles.deals__card}>
                  {discountBadge && (
                    <span className={styles.deals__discount}>{discountBadge}</span>
                  )}

                  <button
                    type="button"
                    className={styles.deals__favorite}
                    aria-label={item.isFavorite ? "Прибрати з обраного" : "Додати в обране"}
                    aria-pressed={item.isFavorite}
                    onClick={() => toggleFavorite(item.id)}
                  >
                    {item.isFavorite ? <IoHeart /> : <IoHeartOutline />}
                  </button>

                  <div className={styles.deals__image_wrap}>
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className={styles.deals__meta}>
                    <span>{item.meta}</span>
                    <span>{item.unitPrice}</span>
                  </div>

                  <h3>{item.title}</h3>

                  <div className={styles.deals__price_row}>
                    <span
                      className={clsx(
                        styles.deals__price,
                        item.oldPrice && styles.deals__price_discount
                      )}
                    >
                      {item.price}
                    </span>
                    {item.oldPrice && (
                      <span className={styles.deals__old_price}>{item.oldPrice}</span>
                    )}
                  </div>

                  <div className={styles.deals__action}>
                    <CartActionControl
                      className={styles.deals__action_control}
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
            styles.deals__pagination,
            "deals-pagination",
            "swiper-pagination-brand"
          )}
        />
      </Container>
    </section>
  );
};

export default DealsSection;
