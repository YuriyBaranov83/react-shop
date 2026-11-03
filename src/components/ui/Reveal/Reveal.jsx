import { useEffect, useRef } from "react";

// Content is visible by default; animation is an enhancement, never a loading gate.
const Reveal = ({ children, ...props }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      preference.matches ||
      !element?.animate ||
      !("IntersectionObserver" in window)
    )
      return undefined;
    if (element.getBoundingClientRect().top < window.innerHeight)
      return undefined;

    let animation;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (preference.matches) return;
        animation = element.animate(
          [
            { opacity: 0.65, transform: "translateY(14px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 500, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
      },
      { threshold: 0.08 },
    );
    const stopMotion = () => {
      if (preference.matches) {
        observer.disconnect();
        animation?.cancel();
      }
    };
    observer.observe(element);
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener("change", stopMotion);
    };
  }, []);

  return (
    <section ref={elementRef} {...props}>
      {children}
    </section>
  );
};
export default Reveal;
