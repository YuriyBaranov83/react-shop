import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { homePromotionsData } from "@/data/homePromotionsData";
import styles from "./PromotionsSection.module.css";
const PromotionsSection = () => (
  <section id="promotions" className={styles.promotions}>
    <Container>
      <SectionHeader
        title="Приємно знайти вигоду"
        linkHref="/catalog?filter=sale"
        linkLabel="Усі пропозиції"
      />
      <div className={styles.grid}>
        {homePromotionsData.map((promo) => (
          <Link key={promo.id} to={promo.href} className={styles.card}>
            <div className={styles.photo}>
              <img
                src={promo.image}
                alt=""
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              {promo.badge && (
                <span className={styles.badge}>{promo.badge}</span>
              )}
            </div>
            <div className={styles.copy}>
              <h3>{promo.title}</h3>
              <p>{promo.text}</p>
              <span aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  </section>
);
export default PromotionsSection;
