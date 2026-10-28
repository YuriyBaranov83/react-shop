import {
  supermarketBreadImage,
  supermarketCannedImage,
  supermarketCoffeeTeaImage,
  supermarketMilkEggsImage,
  supermarketPastaImage,
  supermarketSaucesImage,
  supermarketSnacksImage,
  supermarketWaterDrinksImage,
} from "@/assets/images/home/categories/supermarket";
import {
  culinaryDessertsImage,
  culinaryFreshMeatImage,
  culinaryGrillMenuImage,
  culinaryHotDishesImage,
  culinaryPastriesImage,
  culinaryPizzaImage,
  culinarySaladsImage,
  culinarySoupsImage,
} from "@/assets/images/home/categories/culinary";
import {
  frozenDumplingsImage,
  frozenFishSeafoodImage,
  frozenKhinkaliMantyImage,
  frozenMeatImage,
  frozenSemiFinishedImage,
  frozenVegetablesImage,
} from "@/assets/images/home/categories/frozen";
import {
  otherBeautyHygieneImage,
  otherHouseholdChemistryImage,
  otherUsefulItemsImage,
  otherWashingCleaningImage,
} from "@/assets/images/home/categories/other";
import { buildCatalogCategoryHref } from "./catalogRouting";

export const homeSupermarketTiles = [
  {
    id: "water-drinks",
    title: "Вода й напої",
    image: supermarketWaterDrinksImage,
    href: buildCatalogCategoryHref("supermarket", "water-drinks"),
  },
  {
    id: "milk-eggs",
    title: "Молоко, масло й яйця",
    image: supermarketMilkEggsImage,
    href: buildCatalogCategoryHref("supermarket", "milk-eggs"),
  },
  {
    id: "snacks-dried-fruits",
    title: "Снеки й сухофрукти",
    image: supermarketSnacksImage,
    href: buildCatalogCategoryHref("supermarket", "snacks-dried-fruits"),
  },
  {
    id: "coffee-tea-sweets",
    title: "Кава, чай і солодощі",
    image: supermarketCoffeeTeaImage,
    href: buildCatalogCategoryHref("supermarket", "coffee-tea-sweets"),
  },
  {
    id: "pasta-groats",
    title: "Макарони й крупи",
    image: supermarketPastaImage,
    href: buildCatalogCategoryHref("supermarket", "pasta-groats"),
  },
  {
    id: "bread-bakery",
    title: "Хліб і випічка",
    image: supermarketBreadImage,
    href: buildCatalogCategoryHref("supermarket", "bread-bakery"),
  },
  {
    id: "oils-sauces-spices",
    title: "Олія, соуси й спеції",
    image: supermarketSaucesImage,
    href: buildCatalogCategoryHref("supermarket", "oils-sauces-spices"),
  },
  {
    id: "canned-pickles",
    title: "Консерви й соління",
    image: supermarketCannedImage,
    href: buildCatalogCategoryHref("supermarket", "canned-pickles"),
  },
];

export const homeCulinaryTiles = [
  {
    id: "pastries",
    title: "Випічка",
    image: culinaryPastriesImage,
    href: buildCatalogCategoryHref("culinary", "pastries"),
  },
  {
    id: "pizza",
    title: "Піци",
    image: culinaryPizzaImage,
    href: buildCatalogCategoryHref("culinary", "pizza"),
  },
  {
    id: "grill-menu",
    title: "Гриль-меню",
    image: culinaryGrillMenuImage,
    href: buildCatalogCategoryHref("culinary", "grill-menu"),
  },
  {
    id: "fresh-meat",
    title: "Свіже м'ясо",
    image: culinaryFreshMeatImage,
    href: buildCatalogCategoryHref("culinary", "fresh-meat"),
  },
  {
    id: "salads",
    title: "Салати",
    image: culinarySaladsImage,
    href: buildCatalogCategoryHref("culinary", "salads"),
  },
  {
    id: "soups",
    title: "Супи",
    image: culinarySoupsImage,
    href: buildCatalogCategoryHref("culinary", "soups"),
  },
  {
    id: "hot-dishes",
    title: "Гарячі страви",
    image: culinaryHotDishesImage,
    href: buildCatalogCategoryHref("culinary", "hot-dishes"),
  },
  {
    id: "desserts",
    title: "Десерти",
    image: culinaryDessertsImage,
    href: buildCatalogCategoryHref("culinary", "desserts"),
  },
];

export const homeFrozenTiles = [
  {
    id: "dumplings",
    title: "Пельмені, вареники й равіолі",
    image: frozenDumplingsImage,
    href: buildCatalogCategoryHref("frozen", "dumplings"),
  },
  {
    id: "khinkali-manty",
    title: "Хінкалі й манти",
    image: frozenKhinkaliMantyImage,
    href: buildCatalogCategoryHref("frozen", "khinkali-manty"),
  },
  {
    id: "semi-finished",
    title: "Напівфабрикати",
    image: frozenSemiFinishedImage,
    href: buildCatalogCategoryHref("frozen", "semi-finished"),
  },
  {
    id: "frozen-vegetables",
    title: "Заморожені овочі",
    image: frozenVegetablesImage,
    href: buildCatalogCategoryHref("frozen", "frozen-vegetables"),
  },
  {
    id: "fish-seafood",
    title: "Риба й морепродукти",
    image: frozenFishSeafoodImage,
    href: buildCatalogCategoryHref("frozen", "fish-seafood"),
  },
  {
    id: "frozen-meat",
    title: "М'ясо",
    image: frozenMeatImage,
    href: buildCatalogCategoryHref("frozen", "frozen-meat"),
  },
];

export const homeOtherTiles = [
  {
    id: "beauty-hygiene",
    title: "Краса й гігієна",
    image: otherBeautyHygieneImage,
    href: buildCatalogCategoryHref("other", "beauty-hygiene"),
  },
  {
    id: "washing-cleaning",
    title: "Прання й прибирання",
    image: otherWashingCleaningImage,
    href: buildCatalogCategoryHref("other", "washing-cleaning"),
  },
  {
    id: "useful-items",
    title: "Корисні дрібниці",
    image: otherUsefulItemsImage,
    href: buildCatalogCategoryHref("other", "useful-items"),
  },
  {
    id: "household-chemistry",
    title: "Побутова хімія",
    image: otherHouseholdChemistryImage,
    href: buildCatalogCategoryHref("other", "household-chemistry"),
  },
];
