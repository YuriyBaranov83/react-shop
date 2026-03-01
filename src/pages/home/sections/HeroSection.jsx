import clsx from "clsx";
import { useEffect } from "react";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import Container from "@/components/layout/Container";
import { homeHeroBanners, homeHeroSlides } from "@/data/homeHeroData";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const lcpSlideImage = homeHeroSlides[0]?.image;
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    if (!lcpSlideImage) return;

    let preloadLink = document.querySelector('link[data-hero-lcp-preload="true"]');

    if (!preloadLink) {
      preloadLink = document.createElement("link");
      preloadLink.setAttribute("data-hero-lcp-preload", "true");
      preloadLink.rel = "preload";
      preloadLink.as = "image";
      preloadLink.media = "(max-width: 900px)";
      preloadLink.setAttribute("fetchpriority", "high");
      preloadLink.href = lcpSlideImage;
      document.head.appendChild(preloadLink);
      return;
    }

    preloadLink.href = lcpSlideImage;
  }, [lcpSlideImage]);

  return (
    <section className={styles.hero}>
      <Container>
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
              onInit={(swiper) => setActiveSlideIndex(swiper.realIndex)}
              onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
              className={styles["hero-swiper"]}
            >
              {homeHeroSlides.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  <article className={styles["hero-slide"]}>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                    />
                    <span className={styles["hero-slide-overlay"]} aria-hidden="true" />

                    <div className={styles["hero-slide-content"]}>
                      {index === activeSlideIndex ? (
                        <h1 className={styles["hero-slide-title"]}>{slide.title}</h1>
                      ) : (
                        <p className={styles["hero-slide-title"]}>{slide.title}</p>
                      )}
                      <a href={slide.href}>{slide.buttonText}</a>
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
              <MdChevronRight />
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
