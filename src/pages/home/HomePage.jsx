import "swiper/css";
import "swiper/css/pagination";

import CategoryTilesSection from "@/components/ui/CategoryTilesSection";
import { buildCatalogSectionHref } from "@/data/catalogRouting";
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
        linkHref={buildCatalogSectionHref("supermarket")}
        className={sectionStyles["supermarket-section"]}
      />

      <CategoryTilesSection
        sectionId="culinary"
        title="КУЛІНАРІЯ"
        items={homeCulinaryTiles}
        linkHref={buildCatalogSectionHref("culinary")}
        className={sectionStyles["culinary-section"]}
      />

      <CategoryTilesSection
        sectionId="frozen"
        title="ЗАМОРОЗКА"
        items={homeFrozenTiles}
        linkHref={buildCatalogSectionHref("frozen")}
        className={sectionStyles["frozen-section"]}
      />

      <CategoryTilesSection
        sectionId="other"
        title="ІНШЕ"
        items={homeOtherTiles}
        linkHref={buildCatalogSectionHref("other")}
        className={sectionStyles["other-section"]}
      />

      <PromotionsSection />
      <DeliveryPaymentSection />
    </>
  );
};

export default HomePage;
