import { Link } from "react-router-dom";
import {
  IoArrowForwardOutline,
  IoLeafOutline,
  IoBagHandleOutline,
  IoRestaurantOutline,
} from "react-icons/io5";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button/Button";
import heroPhoto from "@/assets/images/market/produce-basket.webp";
import styles from "./HeroSection.module.css";
const benefits = [
  {
    Icon: IoLeafOutline,
    title: "Від продуктів до натхнення",
    text: "Усе для вашого щоденного меню",
  },
  {
    Icon: IoRestaurantOutline,
    title: "Коли хочеться простіше",
    text: "Випічка та готові страви поруч",
  },
  {
    Icon: IoBagHandleOutline,
    title: "Маленькі приємні покупки",
    text: "Один кошик для всього потрібного",
  },
];
const HeroSection = () => (
  <section className={styles.hero}>
    <Container>
      <div className={styles["hero-grid"]}>
        <div className={styles["hero-copy"]}>
          <p className={styles.eyebrow}>
            <span /> Твій міський маркет
          </p>
          <h1>
            Добре їсти.
            <br />
            <em>Легко жити.</em>
          </h1>
          <p className={styles.intro}>
            Свіжі продукти, улюблена випічка та готові страви. Усе, що робить
            звичайний день трохи смачнішим.
          </p>
          <div className={styles.actions}>
            <Button to="/catalog">
              Обрати продукти <IoArrowForwardOutline aria-hidden="true" />
            </Button>
            <Link to="/catalog/culinary">
              Що сьогодні на вечерю? <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className={styles.note}>
            <span aria-hidden="true">✦</span> Знайдіть свій щоденний смак
          </div>
        </div>
        <div className={styles["hero-visual"]}>
          <img
            src={heroPhoto}
            alt="Кошик зі свіжими сезонними овочами"
            width="1600"
            height="1067"
            fetchPriority="high"
            decoding="async"
          />
          <div className={styles["photo-label"]}>
            <span className={styles["photo-label-dot"]} /> Більше свіжого.
            Більше свого.
          </div>
          <span className={styles["season-stamp"]}>
            Сезон
            <br />
            <strong>смаків</strong>
            <span aria-hidden="true">✳</span>
          </span>
        </div>
      </div>
      <div className={styles.benefits}>
        {benefits.map((benefit) => (
          <div key={benefit.title} className={styles.benefit}>
            <span className={styles["benefit-icon"]}>
              <benefit.Icon aria-hidden="true" />
            </span>
            <div>
              <h2>{benefit.title}</h2>
              <p>{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);
export default HeroSection;
