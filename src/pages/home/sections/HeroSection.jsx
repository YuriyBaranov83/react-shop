import clsx from "clsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import Container from "@/components/layout/Container";
import { homeHeroBanners, homeHeroSlides } from "@/data/homeHeroData";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.hero__grid}>
          <div className={styles.hero__slider_wrap}>
            <button
              type="button"
              className={clsx(styles.hero__nav, styles.hero__nav_prev, "hero-nav-prev")}
              aria-label="Попередній слайд"
            >
              <MdChevronLeft />
            </button>

            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              loop={false}
              autoplay={false}
              observer
              observeParents
              resizeObserver
              speed={650}
              navigation={{
                prevEl: ".hero-nav-prev",
                nextEl: ".hero-nav-next",
              }}
              pagination={{
                el: ".hero-pagination",
                clickable: true,
              }}
              className={styles.hero__swiper}
            >
              {homeHeroSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <article className={styles.hero__slide}>
                    <img src={slide.image} alt={slide.title} />
                    <span className={styles.hero__slide_overlay} aria-hidden="true" />

                    <div className={styles.hero__slide_content}>
                      <h1>{slide.title}</h1>
                      <a href={slide.href}>{slide.buttonText}</a>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className={clsx(styles.hero__nav, styles.hero__nav_next, "hero-nav-next")}
              aria-label="Наступний слайд"
            >
              <MdChevronRight />
            </button>

            <div
              className={clsx(
                styles.hero__pagination,
                "hero-pagination",
                "swiper-pagination-brand"
              )}
            />
          </div>

          <div className={styles.hero__banners}>
            {homeHeroBanners.map((banner) => (
              <a
                key={banner.id}
                href={banner.href}
                className={clsx(
                  styles.hero__banner,
                  banner.tone === "dark" && styles.hero__banner_dark
                )}
              >
                <img src={banner.image} alt={banner.title} />
                <span className={styles.hero__banner_overlay} aria-hidden="true" />
                <p>{banner.title}</p>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
