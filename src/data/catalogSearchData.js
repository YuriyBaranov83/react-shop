import { catalogProductsDetailedList } from "./catalogProductDetailsData";
import { catalogSectionsData } from "./catalogSectionsData";

export const MIN_CATALOG_SEARCH_QUERY_LENGTH = 2;

const normalizeSearchText = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[`\u0027\u2019\u02bc]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const queryToTokens = (query = "") =>
  normalizeSearchText(query)
    .split(" ")
    .filter(Boolean);

const scoreByText = (text, query, tokens) => {
  if (!text || !query) {
    return 0;
  }

  let score = 0;

  if (text === query) {
    score += 320;
  }

  if (text.startsWith(query)) {
    score += 240;
  } else if (text.includes(query)) {
    score += 150;
  }

  tokens.forEach((token) => {
    if (!token) {
      return;
    }

    if (text.startsWith(token)) {
      score += 36;
    }

    if (text.includes(` ${token}`)) {
      score += 22;
    } else if (text.includes(token)) {
      score += 12;
    }
  });

  return score;
};

const categoryIndex = catalogSectionsData.flatMap((section) =>
  section.items.map((item) => ({
    id: `${section.id}:${item.id}`,
    sectionId: section.id,
    sectionLabel: section.sidebarLabel,
    categoryId: item.id,
    title: item.title,
    image: item.image || null,
    tags: Array.isArray(item.tags) ? item.tags : [],
    href: `/catalog/${section.id}?category=${item.id}`,
    normalizedTitle: normalizeSearchText(item.title),
    normalizedSection: normalizeSearchText(section.sidebarLabel),
  }))
);

const productIndex = catalogProductsDetailedList.map((product) => ({
  ...product,
  tags: Array.isArray(product.tags) ? product.tags : [],
  normalizedTitle: normalizeSearchText(product.title),
  normalizedCategory: normalizeSearchText(product.categoryTitle),
  normalizedSection: normalizeSearchText(product.sectionLabel),
}));

const matchesFilter = (item, filterId = "all") =>
  filterId === "all" || (item.tags || []).includes(filterId);

const sortByScoreAndTitle = (a, b) => {
  if (b.score !== a.score) {
    return b.score - a.score;
  }

  return a.title.localeCompare(b.title, "uk");
};

export const getCatalogPopularProducts = (limit = 6) => {
  const salesFirst = productIndex.filter((item) => item.tags.includes("sale"));
  const filled = [...salesFirst];

  if (filled.length < limit) {
    const existingIds = new Set(filled.map((item) => item.id));
    productIndex.forEach((item) => {
      if (existingIds.has(item.id)) {
        return;
      }

      filled.push(item);
    });
  }

  return filled.slice(0, limit);
};

export const searchCatalogProducts = ({
  query,
  filterId = "all",
  sectionId = "",
  categoryId = "",
  limit = 24,
} = {}) => {
  const normalizedQuery = normalizeSearchText(query);
  const queryTokens = queryToTokens(query);

  if (normalizedQuery.length < MIN_CATALOG_SEARCH_QUERY_LENGTH) {
    return [];
  }

  return productIndex
    .filter((item) => {
      if (!matchesFilter(item, filterId)) {
        return false;
      }

      if (sectionId && item.sectionId !== sectionId) {
        return false;
      }

      if (categoryId && item.categoryId !== categoryId) {
        return false;
      }

      return true;
    })
    .map((item) => {
      const titleScore = scoreByText(item.normalizedTitle, normalizedQuery, queryTokens);
      const categoryScore = scoreByText(item.normalizedCategory, normalizedQuery, queryTokens);
      const sectionScore = scoreByText(item.normalizedSection, normalizedQuery, queryTokens);
      const score = titleScore * 3 + categoryScore * 2 + sectionScore;

      return {
        ...item,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort(sortByScoreAndTitle)
    .slice(0, limit);
};

export const searchCatalogCategories = ({
  query,
  filterId = "all",
  sectionId = "",
  limit = 8,
} = {}) => {
  const normalizedQuery = normalizeSearchText(query);
  const queryTokens = queryToTokens(query);

  if (normalizedQuery.length < MIN_CATALOG_SEARCH_QUERY_LENGTH) {
    return [];
  }

  return categoryIndex
    .filter((item) => {
      if (!matchesFilter(item, filterId)) {
        return false;
      }

      if (sectionId && item.sectionId !== sectionId) {
        return false;
      }

      return true;
    })
    .map((item) => {
      const titleScore = scoreByText(item.normalizedTitle, normalizedQuery, queryTokens);
      const sectionScore = scoreByText(item.normalizedSection, normalizedQuery, queryTokens);
      const score = titleScore * 3 + sectionScore;

      return {
        ...item,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort(sortByScoreAndTitle)
    .slice(0, limit);
};
