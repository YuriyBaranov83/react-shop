import {
  homeCulinaryTiles,
  homeFrozenTiles,
  homeOtherTiles,
  homeSupermarketTiles,
} from "./homeCategoryTilesData";
import { catalogProductsByCategory } from "./catalogProductsData";
import { buildCatalogCategoryHref, buildCatalogSectionHref } from "./catalogRouting";

export const catalogFilterOptions = [
  { id: "all", label: "Усі" },
  { id: "sale", label: "Зі знижкою" },
  { id: "delivery-today", label: "Доставка сьогодні (демо)" },
  { id: "brand", label: "Продукція «Urbanfood»" },
];

const withCategoryMeta = (sectionId, items) =>
  items.map((item) => {
    const products = catalogProductsByCategory[item.id] || [];
    const tags = [...new Set(products.flatMap((product) => product.tags))];
    return {
      ...item,
      href: buildCatalogCategoryHref(sectionId, item.id),
      tags,
      deliveryToday: tags.includes("delivery-today"),
    };
  });

export const catalogSectionsData = [
  {
    id: "supermarket",
    title: "СУПЕРМАРКЕТ",
    sidebarLabel: "Супермаркет",
    backgroundTone: "green",
    sectionHref: buildCatalogSectionHref("supermarket"),
    items: withCategoryMeta("supermarket", homeSupermarketTiles),
  },
  {
    id: "culinary",
    title: "КУЛІНАРІЯ",
    sidebarLabel: "Кулінарія",
    backgroundTone: "beige",
    sectionHref: buildCatalogSectionHref("culinary"),
    items: withCategoryMeta("culinary", homeCulinaryTiles),
  },
  {
    id: "frozen",
    title: "ЗАМОРОЗКА",
    sidebarLabel: "Заморозка",
    backgroundTone: "lilac",
    sectionHref: buildCatalogSectionHref("frozen"),
    items: withCategoryMeta("frozen", homeFrozenTiles),
  },
  {
    id: "other",
    title: "ІНШЕ",
    sidebarLabel: "Інше",
    backgroundTone: "cyan",
    sectionHref: buildCatalogSectionHref("other"),
    items: withCategoryMeta("other", homeOtherTiles),
  },
];

export const defaultCatalogSectionId = catalogSectionsData[0]?.id || "supermarket";

export const getCatalogSectionById = (sectionId) =>
  catalogSectionsData.find((section) => section.id === sectionId) || null;

export const hasCatalogFilter = (filterId) =>
  catalogFilterOptions.some((filter) => filter.id === filterId);
