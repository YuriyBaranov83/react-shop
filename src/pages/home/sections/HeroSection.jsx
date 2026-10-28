import clsx from "clsx";
import { Link } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import useMediaQuery from "@/components/header/hooks/useMediaQuery";
import { sliderA11y } from "@/data/sliderA11y";

import Container from "@/components/layout/Container";
import { homeHeroBanners, homeHeroSlides } from "@/data/homeHeroData";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <section className={styles.hero}>
      <Container>
        <h1 className="visually-hidden">Urbanfood — онлайн-супермаркет</h1>
        <div className={styles["hero-grid"]}>
          <div className={styles["hero-slider-wrap"]}>
            <button
              type="button"
              className={clsx(
                styles["hero-nav"],
                styles["hero-nav-prev"],
                "slider-nav-button",
                "hero-nav-prev"
              )}
              aria-label="Попередній слайд"
            >
              <MdChevronLeft aria-hidden="true" />
            </button>

            <Swiper
              modules={[A11y, Navigation, Pagination]}
              a11y={sliderA11y}
              slidesPerView={1}
              loop={false}
              autoplay={false}
              observer
              observeParents
              resizeObserver
              speed={reducedMotion ? 0 : 650}
              navigation={{
                prevEl: ".hero-nav-prev",
                nextEl: ".hero-nav-next",
              }}
              pagination={{
                el: ".hero-pagination",
                clickable: true,
              }}
              className={styles["hero-swiper"]}
            >
              {homeHeroSlides.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  <article className={styles["hero-slide"]}>
                    <img
                      src={slide.image}
                      alt=""
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                    />
                    <span className={styles["hero-slide-overlay"]} aria-hidden="true" />

                    <div className={styles["hero-slide-content"]}>
                      <h2 className={styles["hero-slide-title"]}>{slide.title}</h2>
                      <Link to={slide.href}>{slide.buttonText}</Link>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className={clsx(
                styles["hero-nav"],
                styles["hero-nav-next"],
                "slider-nav-button",
                "hero-nav-next"
              )}
              aria-label="Наступний слайд"
            >
              <MdChevronRight aria-hidden="true" />
            </button>

            <div
              className={clsx(
                styles["hero-pagination"],
                "hero-pagination",
                "swiper-pagination-brand"
              )}
            />
          </div>

          <div className={styles["hero-banners"]}>
            {homeHeroBanners.map((banner) => (
              <a
                key={banner.id}
                href={banner.href}
                className={clsx(
                  styles["hero-banner"],
                  banner.tone === "dark" && styles["hero-banner-dark"]
                )}
              >
                <img src={banner.image} alt={banner.title} loading="lazy" decoding="async" />
                <span className={styles["hero-banner-overlay"]} aria-hidden="true" />
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
