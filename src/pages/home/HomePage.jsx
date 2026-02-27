import "swiper/css";
import "swiper/css/pagination";

import CategoryTilesSection from "@/components/ui/CategoryTilesSection";
import MainLayout from "@/components/layout/MainLayout";
import {
  homeCulinaryTiles,
  homeFrozenTiles,
  homeOtherTiles,
  homeSupermarketTiles,
} from "@/data/homeCategoryTilesData";
import DealsSection from "./sections/DealsSection";
import DeliveryPaymentSection from "./sections/delivery-payment";
import HeroSection from "./sections/HeroSection";
import PromotionsSection from "./sections/PromotionsSection";
import styles from "./HomePage.module.css";
import sectionStyles from "./sections/HomeCategorySections.module.css";

const HomePage = () => {
  return (
    <MainLayout mainClassName={styles.homePageMain} mainId="home-page">
      <HeroSection />
      <DealsSection />
      <CategoryTilesSection
        title="РЎРЈРџР•Р РњРђР РљР•Рў"
        items={homeSupermarketTiles}
        className={sectionStyles.supermarketSection}
      />
      <CategoryTilesSection
        title="РљРЈР›Р†РќРђР Р†РЇ"
        items={homeCulinaryTiles}
        className={sectionStyles.culinarySection}
      />
      <CategoryTilesSection
        title="Р—РђРњРћР РћР—РљРђ"
        items={homeFrozenTiles}
        className={sectionStyles.frozenSection}
      />
      <CategoryTilesSection
        title="Р†РќРЁР•"
        items={homeOtherTiles}
        className={sectionStyles.otherSection}
      />
      <PromotionsSection />
      <DeliveryPaymentSection />
    </MainLayout>
  );
};

export default HomePage;

