import {
  homeCulinaryTiles,
  homeFrozenTiles,
  homeOtherTiles,
  homeSupermarketTiles,
} from "./homeCategoryTilesData";
import { buildCatalogCategoryHref, buildCatalogSectionHref } from "./catalogRouting";

export const catalogFilterOptions = [
  { id: "all", label: "Усі категорії" },
  { id: "sale", label: "Зі знижкою" },
  { id: "delivery-today", label: "Доставка сьогодні" },
  { id: "brand", label: "Продукція «Urbanfood»" },
];

const withCategoryMeta = (sectionId, items, tagsById) =>
  items.map((item, index) => ({
    ...item,
    image: item.image || items[0]?.image || null,
    href: buildCatalogCategoryHref(sectionId, item.id),
    tags: tagsById[item.id] || [],
    deliveryToday: index % 2 === 0,
  }));

const supermarketTagsById = {
  "water-drinks": ["delivery-today", "brand"],
  "milk-eggs": ["sale", "delivery-today"],
  "snacks-dried-fruits": ["sale"],
  "coffee-tea-sweets": ["brand"],
  "pasta-groats": ["delivery-today"],
  "bread-bakery": ["sale", "delivery-today", "brand"],
  "oils-sauces-spices": ["sale"],
  "canned-pickles": ["delivery-today"],
};

const culinaryTagsById = {
  pastries: ["sale", "brand"],
  pizza: ["delivery-today", "brand"],
  "grill-menu": ["delivery-today"],
  "fresh-meat": ["sale"],
  salads: ["delivery-today", "brand"],
  soups: ["brand"],
  "hot-dishes": ["sale", "delivery-today"],
  desserts: ["brand"],
};

const frozenTagsById = {
  dumplings: ["sale"],
  "khinkali-manty": ["sale"],
  "semi-finished": ["delivery-today"],
  "frozen-vegetables": ["delivery-today"],
  "fish-seafood": ["sale"],
  "frozen-meat": ["delivery-today"],
};

const otherTagsById = {
  "beauty-hygiene": ["sale"],
  "washing-cleaning": ["sale", "delivery-today"],
  "useful-items": ["brand"],
  "household-chemistry": ["delivery-today"],
};

export const catalogSectionsData = [
  {
    id: "supermarket",
    title: "СУПЕРМАРКЕТ",
    sidebarLabel: "Супермаркет",
    backgroundTone: "green",
    sectionHref: buildCatalogSectionHref("supermarket"),
    items: withCategoryMeta("supermarket", homeSupermarketTiles, supermarketTagsById),
  },
  {
    id: "culinary",
    title: "КУЛІНАРІЯ",
    sidebarLabel: "Кулінарія",
    backgroundTone: "beige",
    sectionHref: buildCatalogSectionHref("culinary"),
    items: withCategoryMeta("culinary", homeCulinaryTiles, culinaryTagsById),
  },
  {
    id: "frozen",
    title: "ЗАМОРОЗКА",
    sidebarLabel: "Заморозка",
    backgroundTone: "lilac",
    sectionHref: buildCatalogSectionHref("frozen"),
    items: withCategoryMeta("frozen", homeFrozenTiles, frozenTagsById),
  },
  {
    id: "other",
    title: "ІНШЕ",
    sidebarLabel: "Інше",
    backgroundTone: "cyan",
    sectionHref: buildCatalogSectionHref("other"),
    items: withCategoryMeta("other", homeOtherTiles, otherTagsById),
  },
];

export const defaultCatalogSectionId = catalogSectionsData[0]?.id || "supermarket";

export const getCatalogSectionById = (sectionId) =>
  catalogSectionsData.find((section) => section.id === sectionId) || null;

export const hasCatalogFilter = (filterId) =>
  catalogFilterOptions.some((filter) => filter.id === filterId);
