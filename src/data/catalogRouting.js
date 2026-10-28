export const catalogSectionIds = ["supermarket", "culinary", "frozen", "other"];

export const buildCatalogSectionHref = (sectionId) => `/catalog/${sectionId}`;

export const buildCatalogCategoryHref = (sectionId, categoryId) => {
  const params = new URLSearchParams();

  if (categoryId) {
    params.set("category", categoryId);
  }

  const search = params.toString();
  return `${buildCatalogSectionHref(sectionId)}${search ? `?${search}` : ""}`;
};
