import "swiper/css";
import "swiper/css/pagination";

import CategoryTilesSection from "@/components/ui/CategoryTilesSection";
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
import sectionStyles from "./sections/HomeCategorySections.module.css";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <DealsSection />

      <CategoryTilesSection
        sectionId="supermarket"
        title="СУПЕРМАРКЕТ"
        items={homeSupermarketTiles}
        className={sectionStyles["supermarket-section"]}
      />

      <CategoryTilesSection
        sectionId="culinary"
        title="КУЛІНАРІЯ"
        items={homeCulinaryTiles}
        className={sectionStyles["culinary-section"]}
      />

      <CategoryTilesSection
        sectionId="frozen"
        title="ЗАМОРОЗКА"
        items={homeFrozenTiles}
        className={sectionStyles["frozen-section"]}
      />

      <CategoryTilesSection
        sectionId="other"
        title="ІНШЕ"
        items={homeOtherTiles}
        className={sectionStyles["other-section"]}
      />

      <PromotionsSection />
      <DeliveryPaymentSection />
    </>
  );
};

export default HomePage;
