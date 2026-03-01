import { useEffect, useState } from "react";
import clsx from "clsx";
import { IoArrowUp } from "react-icons/io5";
import styles from "./ScrollToTopButton.module.css";

const ScrollToTopButton = ({ showAfter = 320 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfter);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
      tabIndex={isVisible ? 0 : -1}
      className={clsx(styles.scrollTopButton, isVisible && styles.scrollTopButton_visible)}
    >
      <IoArrowUp aria-hidden="true" />
    </button>
  );
};

export default ScrollToTopButton;
