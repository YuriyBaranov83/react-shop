import clsx from "clsx";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import Container from "@/components/layout/Container";
import { homeDealsData } from "@/data/homeDealsData";
import styles from "./DealsSection.module.css";

const renderDealAction = (action) => {
  if (action.type === "counter") {
    return (
      <div className={styles.deals__counter}>
        <button type="button" aria-label="Зменшити кількість">
          -
        </button>
        <span>{action.count}</span>
        <button type="button" aria-label="Збільшити кількість">
          +
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={clsx(
        styles.deals__action_btn,
        action.type === "tomorrow" && styles.deals__action_btn_tomorrow
      )}
    >
      {action.label}
    </button>
  );
};

const DealsSection = () => {
  return (
    <section className={styles.deals}>
      <Container>
        <div className={styles.deals__head}>
          <div className={styles.deals__head_left}>
            <h2>ЗНИЖКИ</h2>
            <a href="#">Дивитися все</a>
          </div>

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
        </div>

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
          {homeDealsData.map((item) => (
            <SwiperSlide key={item.id}>
              <article className={styles.deals__card}>
                {item.discount && <span className={styles.deals__discount}>{item.discount}</span>}

                <button
                  type="button"
                  className={styles.deals__favorite}
                  aria-label={item.isFavorite ? "Прибрати з обраного" : "Додати в обране"}
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
                  {item.oldPrice && <span className={styles.deals__old_price}>{item.oldPrice}</span>}
                </div>

                <div className={styles.deals__action}>{renderDealAction(item.action)}</div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={clsx(styles.deals__pagination, "deals-pagination")} />
      </Container>
    </section>
  );
};

export default DealsSection;
