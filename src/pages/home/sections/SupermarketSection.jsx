import Container from "@/components/layout/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { homeSupermarketData } from "@/data/homeSupermarketData";
import styles from "./SupermarketSection.module.css";

const SupermarketSection = () => {
  return (
    <section className={styles.supermarket}>
      <Container>
        <SectionHeader
          title="СУПЕРМАРКЕТ"
          linkLabel="Дивитися все"
          className={styles.supermarket__head}
        />

        <div className={styles.supermarket__grid}>
          {homeSupermarketData.map((item) => (
            <a key={item.id} href={item.href} className={styles.supermarket__card}>
              <span className={styles.supermarket__title}>{item.title}</span>
              <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SupermarketSection;
