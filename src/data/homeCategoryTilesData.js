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

export const homeSupermarketTiles = [
  {
    id: "water-drinks",
    title: "Вода й напої",
    image: supermarketWaterDrinksImage,
    href: "/#supermarket",
  },
  {
    id: "milk-eggs",
    title: "Молоко, масло й яйця",
    image: supermarketMilkEggsImage,
    href: "/#supermarket",
  },
  {
    id: "snacks-dried-fruits",
    title: "Снеки й сухофрукти",
    image: supermarketSnacksImage,
    href: "/#supermarket",
  },
  {
    id: "coffee-tea-sweets",
    title: "Кава, чай і солодощі",
    image: supermarketCoffeeTeaImage,
    href: "/#supermarket",
  },
  {
    id: "pasta-groats",
    title: "Макарони й крупи",
    image: supermarketPastaImage,
    href: "/#supermarket",
  },
  {
    id: "bread-bakery",
    title: "Хліб і випічка",
    image: supermarketBreadImage,
    href: "/#supermarket",
  },
  {
    id: "oils-sauces-spices",
    title: "Олія, соуси й спеції",
    image: supermarketSaucesImage,
    href: "/#supermarket",
  },
  {
    id: "canned-pickles",
    title: "Консерви й соління",
    image: supermarketCannedImage,
    href: "/#supermarket",
  },
];

export const homeCulinaryTiles = [
  { id: "pastries", title: "Випічка", image: culinaryPastriesImage, href: "/#culinary" },
  { id: "pizza", title: "Піци", image: culinaryPizzaImage, href: "/#culinary" },
  { id: "grill-menu", title: "Гриль-меню", image: culinaryGrillMenuImage, href: "/#culinary" },
  { id: "fresh-meat", title: "Свіже м'ясо", image: culinaryFreshMeatImage, href: "/#culinary" },
  { id: "salads", title: "Салати", image: culinarySaladsImage, href: "/#culinary" },
  { id: "soups", title: "Супи", image: culinarySoupsImage, href: "/#culinary" },
  { id: "hot-dishes", title: "Гарячі страви", image: culinaryHotDishesImage, href: "/#culinary" },
  { id: "desserts", title: "Десерти", image: culinaryDessertsImage, href: "/#culinary" },
];

export const homeFrozenTiles = [
  {
    id: "dumplings",
    title: "Пельмені, вареники й равіолі",
    image: frozenDumplingsImage,
    href: "/#frozen",
  },
  {
    id: "khinkali-manty",
    title: "Хінкалі й манти",
    image: frozenKhinkaliMantyImage,
    href: "/#frozen",
  },
  {
    id: "semi-finished",
    title: "Напівфабрикати",
    image: frozenSemiFinishedImage,
    href: "/#frozen",
  },
  {
    id: "frozen-vegetables",
    title: "Заморожені овочі",
    image: frozenVegetablesImage,
    href: "/#frozen",
  },
  {
    id: "fish-seafood",
    title: "Риба й морепродукти",
    image: frozenFishSeafoodImage,
    href: "/#frozen",
  },
  {
    id: "frozen-meat",
    title: "М'ясо",
    image: frozenMeatImage,
    href: "/#frozen",
  },
];

export const homeOtherTiles = [
  {
    id: "beauty-hygiene",
    title: "Краса й гігієна",
    image: otherBeautyHygieneImage,
    href: "/#other",
  },
  {
    id: "washing-cleaning",
    title: "Прання й прибирання",
    image: otherWashingCleaningImage,
    href: "/#other",
  },
  {
    id: "useful-items",
    title: "Корисні дрібниці",
    image: otherUsefulItemsImage,
    href: "/#other",
  },
  {
    id: "household-chemistry",
    title: "Побутова техніка",
    image: otherHouseholdChemistryImage,
    href: "/#other",
  },
];
