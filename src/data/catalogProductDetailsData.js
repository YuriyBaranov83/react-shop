import { catalogProductsByCategory } from "./catalogProductsData";
import { catalogSectionsData } from "./catalogSectionsData";

const defaultDescription = [
  "Склад: натуральні інгредієнти, підготовлені для щоденного споживання.",
  "Поживна цінність на 100 г: білки 4.5 г, жири 6.5 г, вуглеводи 32 г.",
  "Термін зберігання: 6 місяців.",
  "Рекомендована температура зберігання: -18°C.",
];

const defaultUnitLabel = "шт";
const defaultCtaLabel = "Детальніше";

const categoryMetaById = new Map();

catalogSectionsData.forEach((section) => {
  section.items.forEach((item) => {
    categoryMetaById.set(item.id, {
      sectionId: section.id,
      sectionLabel: section.sidebarLabel,
      categoryTitle: item.title,
      categoryHref: `/catalog/${section.id}?category=${item.id}`,
    });
  });
});

const buildGallery = (image) => {
  if (!image) {
    return [];
  }

  return [image, image, image];
};

const catalogProductsList = Object.entries(catalogProductsByCategory).flatMap(
  ([categoryId, products]) => {
    const categoryMeta = categoryMetaById.get(categoryId);

    return products.map((product) => ({
      ...product,
      categoryId,
      sectionId: categoryMeta?.sectionId || "supermarket",
      sectionLabel: categoryMeta?.sectionLabel || "Каталог",
      categoryTitle: categoryMeta?.categoryTitle || "",
      categoryHref: categoryMeta?.categoryHref || `/catalog/supermarket?category=${categoryId}`,
      unitLabel: defaultUnitLabel,
      ctaLabel: defaultCtaLabel,
      description: defaultDescription,
      gallery: buildGallery(product.image),
    }));
  }
);

const productById = new Map(catalogProductsList.map((product) => [product.id, product]));

const productsByCategoryId = new Map();

catalogProductsList.forEach((product) => {
  const existingProducts = productsByCategoryId.get(product.categoryId) || [];
  productsByCategoryId.set(product.categoryId, [...existingProducts, product]);
});

export const getCatalogProductById = (productId) => productById.get(productId) || null;

export const getCatalogSimilarProducts = (productId, limit = 4) => {
  const activeProduct = getCatalogProductById(productId);

  if (!activeProduct) {
    return [];
  }

  const sameCategoryProducts = (productsByCategoryId.get(activeProduct.categoryId) || []).filter(
    (item) => item.id !== productId
  );

  if (sameCategoryProducts.length >= limit) {
    return sameCategoryProducts.slice(0, limit);
  }

  const usedIds = new Set(sameCategoryProducts.map((item) => item.id));
  const fallbackProducts = catalogProductsList.filter((item) => {
    if (item.id === productId) {
      return false;
    }

    return !usedIds.has(item.id);
  });

  return [...sameCategoryProducts, ...fallbackProducts].slice(0, limit);
};

export const getCatalogProductsByIds = (productIds) =>
  productIds.map((productId) => getCatalogProductById(productId)).filter(Boolean);

export const catalogProductsDetailedList = catalogProductsList;
