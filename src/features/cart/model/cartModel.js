import { resolveProductId } from "../../../data/productAliases.js";

export const normalizeQuantity = (value, stock) => {
  if (typeof value !== "number" && typeof value !== "string") return 0;
  const quantity = Number(value);
  if (!Number.isFinite(quantity)) return 0;
  return Math.min(stock, Math.max(0, Math.floor(quantity)));
};

export const normalizeCartItems = (value, productsById) => {
  if (!Array.isArray(value)) return [];
  const quantities = new Map();

  value.forEach((item) => {
    const id = resolveProductId(item?.id);
    const product = productsById.get(id);
    if (!product) return;
    const quantity = normalizeQuantity(item.quantity, product.stock);
    quantities.set(id, Math.min(product.stock, (quantities.get(id) || 0) + quantity));
  });

  return [...quantities].filter(([, quantity]) => quantity > 0).map(([id, quantity]) => ({ id, quantity }));
};

export const normalizeFavoriteIds = (value, productsById) =>
  Array.isArray(value)
    ? [...new Set(value.map(resolveProductId).filter((id) => productsById.has(id)))]
    : [];
