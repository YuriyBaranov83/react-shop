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
    href: "#",
  },
  {
    id: "milk-eggs",
    title: "Молоко, масло й яйця",
    image: supermarketMilkEggsImage,
    href: "#",
  },
  {
    id: "snacks-dried-fruits",
    title: "Снеки й сухофрукти",
    image: supermarketSnacksImage,
    href: "#",
  },
  {
    id: "coffee-tea-sweets",
    title: "Кава, чай і солодощі",
    image: supermarketCoffeeTeaImage,
    href: "#",
  },
  {
    id: "pasta-groats",
    title: "Макарони й крупи",
    image: supermarketPastaImage,
    href: "#",
  },
  {
    id: "bread-bakery",
    title: "Хліб і випічка",
    image: supermarketBreadImage,
    href: "#",
  },
  {
    id: "oils-sauces-spices",
    title: "Олія, соуси й спеції",
    image: supermarketSaucesImage,
    href: "#",
  },
  {
    id: "canned-pickles",
    title: "Консерви й соління",
    image: supermarketCannedImage,
    href: "#",
  },
];

export const homeCulinaryTiles = [
  { id: "pastries", title: "Випічка", image: culinaryPastriesImage, href: "#" },
  { id: "pizza", title: "Піци", image: culinaryPizzaImage, href: "#" },
  { id: "grill-menu", title: "Гриль-меню", image: culinaryGrillMenuImage, href: "#" },
  { id: "fresh-meat", title: "Свіже м'ясо", image: culinaryFreshMeatImage, href: "#" },
  { id: "salads", title: "Салати", image: culinarySaladsImage, href: "#" },
  { id: "soups", title: "Супи", image: culinarySoupsImage, href: "#" },
  { id: "hot-dishes", title: "Гарячі страви", image: culinaryHotDishesImage, href: "#" },
  { id: "desserts", title: "Десерти", image: culinaryDessertsImage, href: "#" },
];

export const homeFrozenTiles = [
  {
    id: "dumplings",
    title: "Пельмені, вареники й равіолі",
    image: frozenDumplingsImage,
    href: "#",
  },
  {
    id: "khinkali-manty",
    title: "Хінкалі й манти",
    image: frozenKhinkaliMantyImage,
    href: "#",
  },
  {
    id: "semi-finished",
    title: "Напівфабрикати",
    image: frozenSemiFinishedImage,
    href: "#",
  },
  {
    id: "frozen-vegetables",
    title: "Заморожені овочі",
    image: frozenVegetablesImage,
    href: "#",
  },
  {
    id: "fish-seafood",
    title: "Риба й морепродукти",
    image: frozenFishSeafoodImage,
    href: "#",
  },
  {
    id: "frozen-meat",
    title: "М'ясо",
    image: frozenMeatImage,
    href: "#",
  },
];

export const homeOtherTiles = [
  {
    id: "beauty-hygiene",
    title: "Краса й гігієна",
    image: otherBeautyHygieneImage,
    href: "#",
  },
  {
    id: "washing-cleaning",
    title: "Прання й прибирання",
    image: otherWashingCleaningImage,
    href: "#",
  },
  {
    id: "useful-items",
    title: "Корисні дрібниці",
    image: otherUsefulItemsImage,
    href: "#",
  },
  {
    id: "household-chemistry",
    title: "Побутова хімія",
    image: otherHouseholdChemistryImage,
    href: "#",
  },
];
