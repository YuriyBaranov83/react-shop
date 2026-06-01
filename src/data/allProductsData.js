import { catalogProductsByCategory } from "./catalogProductsData";
import { homeDealsData } from "./homeDealsData";

const catalogProductsList = Object.values(catalogProductsByCategory).flat();

const normalizedCatalogProducts = catalogProductsList.map((product) => ({
  id: product.id,
  image: product.image,
  title: product.title,
  meta: product.availability,
  unitPrice: product.price,
  price: product.price,
  oldPrice: product.oldPrice || "",
  action: { type: "cart", label: "В кошик" },
  isFavorite: false,
}));

export const allProductsData = [...homeDealsData, ...normalizedCatalogProducts];
