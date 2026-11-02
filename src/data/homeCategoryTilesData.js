import { categoryPhotography } from "./marketPhotography";
import { buildCatalogCategoryHref } from "./catalogRouting";

export const homeSupermarketTiles = [
  {
    id: "water-drinks",
    title: "Вода й напої",
    image: categoryPhotography["water-drinks"],
    href: buildCatalogCategoryHref("supermarket", "water-drinks"),
  },
  {
    id: "milk-eggs",
    title: "Молоко, масло й яйця",
    image: categoryPhotography["milk-eggs"],
    href: buildCatalogCategoryHref("supermarket", "milk-eggs"),
  },
  {
    id: "snacks-dried-fruits",
    title: "Снеки й сухофрукти",
    image: categoryPhotography["snacks-dried-fruits"],
    href: buildCatalogCategoryHref("supermarket", "snacks-dried-fruits"),
  },
  {
    id: "coffee-tea-sweets",
    title: "Кава, чай і солодощі",
    image: categoryPhotography["coffee-tea-sweets"],
    href: buildCatalogCategoryHref("supermarket", "coffee-tea-sweets"),
  },
  {
    id: "pasta-groats",
    title: "Макарони й крупи",
    image: categoryPhotography["pasta-groats"],
    href: buildCatalogCategoryHref("supermarket", "pasta-groats"),
  },
  {
    id: "bread-bakery",
    title: "Хліб і випічка",
    image: categoryPhotography["bread-bakery"],
    href: buildCatalogCategoryHref("supermarket", "bread-bakery"),
  },
  {
    id: "oils-sauces-spices",
    title: "Олія, соуси й спеції",
    image: categoryPhotography["oils-sauces-spices"],
    href: buildCatalogCategoryHref("supermarket", "oils-sauces-spices"),
  },
  {
    id: "canned-pickles",
    title: "Консерви й соління",
    image: categoryPhotography["canned-pickles"],
    href: buildCatalogCategoryHref("supermarket", "canned-pickles"),
  },
];

export const homeCulinaryTiles = [
  {
    id: "pastries",
    title: "Випічка",
    image: categoryPhotography["pastries"],
    href: buildCatalogCategoryHref("culinary", "pastries"),
  },
  {
    id: "pizza",
    title: "Піци",
    image: categoryPhotography["pizza"],
    href: buildCatalogCategoryHref("culinary", "pizza"),
  },
  {
    id: "grill-menu",
    title: "Гриль-меню",
    image: categoryPhotography["grill-menu"],
    href: buildCatalogCategoryHref("culinary", "grill-menu"),
  },
  {
    id: "fresh-meat",
    title: "Свіже м'ясо",
    image: categoryPhotography["fresh-meat"],
    href: buildCatalogCategoryHref("culinary", "fresh-meat"),
  },
  {
    id: "salads",
    title: "Салати",
    image: categoryPhotography["salads"],
    href: buildCatalogCategoryHref("culinary", "salads"),
  },
  {
    id: "soups",
    title: "Супи",
    image: categoryPhotography["soups"],
    href: buildCatalogCategoryHref("culinary", "soups"),
  },
  {
    id: "hot-dishes",
    title: "Гарячі страви",
    image: categoryPhotography["hot-dishes"],
    href: buildCatalogCategoryHref("culinary", "hot-dishes"),
  },
  {
    id: "desserts",
    title: "Десерти",
    image: categoryPhotography["desserts"],
    href: buildCatalogCategoryHref("culinary", "desserts"),
  },
];

export const homeFrozenTiles = [
  {
    id: "dumplings",
    title: "Пельмені, вареники й равіолі",
    image: categoryPhotography["dumplings"],
    href: buildCatalogCategoryHref("frozen", "dumplings"),
  },
  {
    id: "khinkali-manty",
    title: "Хінкалі й манти",
    image: categoryPhotography["khinkali-manty"],
    href: buildCatalogCategoryHref("frozen", "khinkali-manty"),
  },
  {
    id: "semi-finished",
    title: "Напівфабрикати",
    image: categoryPhotography["semi-finished"],
    href: buildCatalogCategoryHref("frozen", "semi-finished"),
  },
  {
    id: "frozen-vegetables",
    title: "Заморожені овочі",
    image: categoryPhotography["frozen-vegetables"],
    href: buildCatalogCategoryHref("frozen", "frozen-vegetables"),
  },
  {
    id: "fish-seafood",
    title: "Риба й морепродукти",
    image: categoryPhotography["fish-seafood"],
    href: buildCatalogCategoryHref("frozen", "fish-seafood"),
  },
  {
    id: "frozen-meat",
    title: "М'ясо",
    image: categoryPhotography["frozen-meat"],
    href: buildCatalogCategoryHref("frozen", "frozen-meat"),
  },
];

export const homeOtherTiles = [
  {
    id: "beauty-hygiene",
    title: "Краса й гігієна",
    image: categoryPhotography["beauty-hygiene"],
    href: buildCatalogCategoryHref("other", "beauty-hygiene"),
  },
  {
    id: "washing-cleaning",
    title: "Прання й прибирання",
    image: categoryPhotography["washing-cleaning"],
    href: buildCatalogCategoryHref("other", "washing-cleaning"),
  },
  {
    id: "useful-items",
    title: "Корисні дрібниці",
    image: categoryPhotography["useful-items"],
    href: buildCatalogCategoryHref("other", "useful-items"),
  },
  {
    id: "household-chemistry",
    title: "Побутова хімія",
    image: categoryPhotography["household-chemistry"],
    href: buildCatalogCategoryHref("other", "household-chemistry"),
  },
];
