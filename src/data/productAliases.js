const legacyDealIds = {
  "cheesy-1": "milk-eggs-product-cheese",
  "cofe-1": "coffee-tea-sweets-product-1",
  "cola-1": "water-drinks-product-2",
  "shampoo-1": "beauty-hygiene-product-2",
  "slipers-1": "useful-items-product-slippers",
  "vine-1": "water-drinks-product-wine",
};

// Earlier demo versions generated five copies of each category's two products.
// Keep saved baskets and old product links pointing to the original products.
export const resolveProductId = (id) => {
  if (typeof id !== "string") return "";
  if (Object.hasOwn(legacyDealIds, id)) return legacyDealIds[id];
  return id.replace(/-product-([3-7])$/, (_, variant) => `-product-${Number(variant) % 2 ? 1 : 2}`);
};
