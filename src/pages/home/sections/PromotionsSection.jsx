import { Link } from "react-router-dom";
import clsx from "clsx";
import { IoArrowForwardOutline, IoPricetagOutline } from "react-icons/io5";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal/Reveal";
import { homePromotionsData } from "@/data/homePromotionsData";
import styles from "./PromotionsSection.module.css";

const tones = {
  market: styles.market,
  sunny: styles.sunny,
  cream: styles.cream,
};

const PromotionsSection = () => (
  <Reveal id="promotions" className={styles.promotions}>
    <Container>
      <SectionHeader
        title="Приємно знайти вигоду"
        linkHref="/catalog?filter=sale"
        linkLabel="Усі пропозиції"
      />
      <div className={styles.grid}>
        {homePromotionsData.map((promo) => (
          <Link
            key={promo.id}
            to={promo.href}
            className={clsx(styles.card, tones[promo.variant])}
          >
            <p className={styles.eyebrow}>
              <IoPricetagOutline aria-hidden="true" />
              {promo.eyebrow}
            </p>
            <h3
              className={clsx(
                styles.value,
                promo.code && styles["coupon-value"],
              )}
            >
              {promo.title}
            </h3>
            <p className={styles.description}>{promo.text}</p>
            {promo.code && (
              <p className={styles.code}>
                <span>Демо-промокод</span>
                <strong>{promo.code}</strong>
              </p>
            )}
            <span className={styles.action}>
              {promo.action}
              <IoArrowForwardOutline aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </Container>
  </Reveal>
);
export default PromotionsSection;
