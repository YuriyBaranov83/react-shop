import { Link } from "react-router-dom";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button/Button";
import Reveal from "@/components/ui/Reveal/Reveal";
import CategoryTilesSection from "@/components/ui/CategoryTilesSection";
import {
  homeSupermarketTiles,
  homeCulinaryTiles,
} from "@/data/homeCategoryTilesData";
import {
  categoryPhotography,
  editorialPhotography,
} from "@/data/marketPhotography";
import HeroSection from "./sections/HeroSection";
import DealsSection from "./sections/DealsSection";
import PromotionsSection from "./sections/PromotionsSection";
import DeliveryPaymentSection from "./sections/delivery-payment";
import styles from "./HomePage.module.css";
const HomePage = () => (
  <div className={styles["home-page-main"]}>
    <HeroSection />
    <CategoryTilesSection
      sectionId="supermarket"
      title="З чого почнемо?"
      items={homeSupermarketTiles}
      linkHref="/catalog/supermarket"
      linkLabel="Увесь супермаркет"
    />
    <DealsSection />
    <Reveal className={styles.story}>
      <Container>
        <div className={styles["story-grid"]}>
          <div className={styles["story-copy"]}>
            <p className={styles.eyebrow}>Натхнення на щодень</p>
            <h2>
              Вечеря без довгих
              <br />
              списків справ.
            </h2>
            <p>
              Піца до фільму, свіжий салат чи круасан до кави. Знайдіть щось під
              свій настрій у нашій кулінарії.
            </p>
            <Button to="/catalog/culinary" variant="secondary">
              Зазирнути в кулінарію <span aria-hidden="true">↗</span>
            </Button>
          </div>
          <div className={styles["story-photo"]}>
            <img
              src={editorialPhotography.bakery}
              alt="Свіжий хліб на лляній скатертині"
              width="1400"
              height="933"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Container>
    </Reveal>
    <CategoryTilesSection
      sectionId="culinary"
      title="Смачні ідеї вже тут"
      items={homeCulinaryTiles.filter((item) =>
        ["pastries", "pizza", "salads", "hot-dishes"].includes(item.id),
      )}
      linkHref="/catalog/culinary"
      linkLabel="Уся кулінарія"
    />
    <Reveal className={styles.collections}>
      <Container>
        <div className={styles["collections-grid"]}>
          <Link to="/catalog/frozen" className={styles.collection}>
            <img
              src={categoryPhotography["frozen-vegetables"]}
              alt=""
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p>Продуманий запас</p>
              <h2>Більше часу для себе</h2>
              <span>
                Обрати заморожені продукти <b aria-hidden="true">↗</b>
              </span>
            </div>
          </Link>
          <Link to="/catalog/other" className={styles.collection}>
            <img
              src={categoryPhotography["beauty-hygiene"]}
              alt=""
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p>Маленькі щоденні ритуали</p>
              <h2>Турбота про дім і себе</h2>
              <span>
                Усе для затишку <b aria-hidden="true">↗</b>
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </Reveal>
    <PromotionsSection />
    <DeliveryPaymentSection />
  </div>
);
export default HomePage;
