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
        title="СУПЕРМАРКЕТ"
        items={homeSupermarketTiles}
        className={sectionStyles.supermarketSection}
      />
      <CategoryTilesSection
        title="КУЛІНАРІЯ"
        items={homeCulinaryTiles}
        className={sectionStyles.culinarySection}
      />
      <CategoryTilesSection
        title="ЗАМОРОЗКА"
        items={homeFrozenTiles}
        className={sectionStyles.frozenSection}
      />
      <CategoryTilesSection
        title="ІНШЕ"
        items={homeOtherTiles}
        className={sectionStyles.otherSection}
      />
      <PromotionsSection />
    </MainLayout>
  );
};

export default HomePage;
