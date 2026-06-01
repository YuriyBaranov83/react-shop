import borodynskiiImage from "../../borodynskii.jpg";
import {
  homeCulinaryTiles,
  homeFrozenTiles,
  homeOtherTiles,
  homeSupermarketTiles,
} from "./homeCategoryTilesData";
import { homeDealsData } from "./homeDealsData";

const categoryImageMap = new Map(
  [
    ...homeSupermarketTiles,
    ...homeCulinaryTiles,
    ...homeFrozenTiles,
    ...homeOtherTiles,
  ].map((item) => [item.id, item.image])
);

const dealsImageMap = Object.fromEntries(
  homeDealsData.map((item) => [item.id, item.image])
);

const productsPerCategory = 7;

const parsePriceValue = (price = "") => {
  const normalizedValue = String(price).replace(/[^\d,.-]/g, "").replace(",", ".");
  const parsedValue = Number(normalizedValue);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const formatPriceValue = (value) => `${Number(value).toFixed(2).replace(".", ",")} грн`;

const buildFilledProducts = (products) => {
  if (products.length >= productsPerCategory) {
    return products.slice(0, productsPerCategory);
  }

  const filledProducts = [...products];
  const missingCount = productsPerCategory - products.length;

  for (let index = 0; index < missingCount; index += 1) {
    const sourceProduct = products[index % products.length];
    const sourcePrice = parsePriceValue(sourceProduct.price);
    const variantNumber = products.length + index + 1;
    const nextPriceValue = sourcePrice + 3 + index * 2.75;
    const hasDiscount = index % 2 === 0;
    const nextOldPriceValue = hasDiscount ? nextPriceValue + 8 + (index % 3) * 2 : 0;
    const sourceTags = Array.isArray(sourceProduct.tags) ? sourceProduct.tags : [];
    const nextTags = hasDiscount
      ? Array.from(new Set([...sourceTags, "sale"]))
      : sourceTags.filter((tag) => tag !== "sale");

    filledProducts.push({
      ...sourceProduct,
      title: `${sourceProduct.title} • Варіант ${variantNumber}`,
      price: formatPriceValue(nextPriceValue),
      oldPrice: hasDiscount ? formatPriceValue(nextOldPriceValue) : "",
      tags: nextTags,
      availability: `В наявності ${16 + variantNumber * 4} шт`,
    });
  }

  return filledProducts;
};

const withCategoryProducts = (categoryId, products) =>
  buildFilledProducts(products).map((product, index) => ({
    id: `${categoryId}-product-${index + 1}`,
    availability: product.availability || `В наявності ${12 + index * 7} шт`,
    image: product.image || categoryImageMap.get(categoryId) || dealsImageMap["cofe-1"] || null,
    ...product,
  }));

export const catalogProductsByCategory = {
  "water-drinks": withCategoryProducts("water-drinks", [
    {
      title: "Вода мінеральна Urbanfood, 1.5л",
      price: "32,90 грн",
      oldPrice: "39,90 грн",
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      title: "Напій Cola Classic, 1.5л",
      price: "54,90 грн",
      oldPrice: "69,90 грн",
      image: dealsImageMap["cola-1"],
      tags: ["sale", "delivery-today"],
    },
  ]),
  "milk-eggs": withCategoryProducts("milk-eggs", [
    {
      title: "Молоко фермерське 2.5%, 900мл",
      price: "46,50 грн",
      oldPrice: "52,00 грн",
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      title: "Яйця курячі C1, 10 шт",
      price: "61,90 грн",
      tags: ["delivery-today"],
    },
  ]),
  "snacks-dried-fruits": withCategoryProducts("snacks-dried-fruits", [
    {
      title: "Чіпси кукурудзяні з сиром, 140г",
      price: "48,90 грн",
      oldPrice: "59,90 грн",
      tags: ["sale"],
    },
    {
      title: "Мікс горіхів та сухофруктів, 200г",
      price: "129,00 грн",
      tags: ["delivery-today", "brand"],
    },
  ]),
  "coffee-tea-sweets": withCategoryProducts("coffee-tea-sweets", [
    {
      title: "Кава мелена Arabica Gold, 250г",
      price: "189,00 грн",
      oldPrice: "229,00 грн",
      image: dealsImageMap["cofe-1"],
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Чай чорний цейлонський, 100 пакетиків",
      price: "93,50 грн",
      tags: ["brand"],
    },
  ]),
  "pasta-groats": withCategoryProducts("pasta-groats", [
    {
      title: "Макарони з твердих сортів, 500г",
      price: "49,90 грн",
      oldPrice: "62,00 грн",
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Рис довгозернистий, 900г",
      price: "72,90 грн",
      tags: ["delivery-today"],
    },
  ]),
  "bread-bakery": withCategoryProducts("bread-bakery", [
    {
      title: "Хліб Бородинський, 450г",
      price: "59,90 грн",
      oldPrice: "69,90 грн",
      image: borodynskiiImage,
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      title: "Хліб житньо-пшеничний, 500г",
      price: "63,90 грн",
      oldPrice: "74,90 грн",
      image: borodynskiiImage,
      tags: ["sale", "delivery-today", "brand"],
    },
  ]),
  "oils-sauces-spices": withCategoryProducts("oils-sauces-spices", [
    {
      title: "Олія соняшникова рафінована, 850мл",
      price: "71,90 грн",
      tags: ["delivery-today", "brand"],
    },
    {
      title: "Соус томатний гострий, 320г",
      price: "43,90 грн",
      oldPrice: "52,00 грн",
      tags: ["sale"],
    },
  ]),
  "canned-pickles": withCategoryProducts("canned-pickles", [
    {
      title: "Горошок консервований, 420г",
      price: "49,90 грн",
      oldPrice: "59,90 грн",
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Кукурудза солодка, 340г",
      price: "47,50 грн",
      tags: ["delivery-today", "brand"],
    },
  ]),

  pastries: withCategoryProducts("pastries", [
    {
      title: "Круасан вершковий, 80г",
      price: "36,90 грн",
      oldPrice: "42,90 грн",
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Булочка з корицею, 110г",
      price: "34,50 грн",
      tags: ["delivery-today", "brand"],
    },
  ]),
  pizza: withCategoryProducts("pizza", [
    {
      title: "Піца Маргарита, 420г",
      price: "189,00 грн",
      oldPrice: "219,00 грн",
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      title: "Піца з шинкою та сиром, 460г",
      price: "209,00 грн",
      tags: ["delivery-today"],
    },
  ]),
  "grill-menu": withCategoryProducts("grill-menu", [
    {
      title: "Курка гриль, 1кг",
      price: "289,00 грн",
      oldPrice: "329,00 грн",
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Ковбаски гриль, 600г",
      price: "199,00 грн",
      tags: ["brand"],
    },
  ]),
  "fresh-meat": withCategoryProducts("fresh-meat", [
    {
      title: "Філе куряче охолоджене, 1кг",
      price: "179,00 грн",
      oldPrice: "199,00 грн",
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Шия свиняча охолоджена, 1кг",
      price: "239,00 грн",
      tags: ["delivery-today"],
    },
  ]),
  salads: withCategoryProducts("salads", [
    {
      title: "Салат Цезар, 250г",
      price: "129,00 грн",
      oldPrice: "149,00 грн",
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      title: "Салат Грецький, 240г",
      price: "119,00 грн",
      tags: ["delivery-today"],
    },
  ]),
  soups: withCategoryProducts("soups", [
    {
      title: "Борщ український, 450г",
      price: "89,00 грн",
      oldPrice: "99,00 грн",
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      title: "Суп курячий з локшиною, 400г",
      price: "79,00 грн",
      tags: ["delivery-today"],
    },
  ]),
  "hot-dishes": withCategoryProducts("hot-dishes", [
    {
      title: "Котлета по-київськи з гарніром, 320г",
      price: "149,00 грн",
      oldPrice: "179,00 грн",
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Плов з куркою, 350г",
      price: "119,00 грн",
      tags: ["delivery-today", "brand"],
    },
  ]),
  desserts: withCategoryProducts("desserts", [
    {
      title: "Торт медовий, 550г",
      price: "249,00 грн",
      oldPrice: "289,00 грн",
      tags: ["sale", "brand"],
    },
    {
      title: "Еклер заварний, 90г",
      price: "45,00 грн",
      tags: ["delivery-today"],
    },
  ]),

  dumplings: withCategoryProducts("dumplings", [
    {
      title: "Пельмені домашні, 800г",
      price: "134,90 грн",
      oldPrice: "159,90 грн",
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Вареники з картоплею, 900г",
      price: "109,90 грн",
      tags: ["brand"],
    },
  ]),
  "khinkali-manty": withCategoryProducts("khinkali-manty", [
    {
      title: "Хінкалі з яловичиною, 900г",
      price: "169,00 грн",
      oldPrice: "199,00 грн",
      tags: ["sale"],
    },
    {
      title: "Манти зі свининою, 1кг",
      price: "179,00 грн",
      tags: ["delivery-today"],
    },
  ]),
  "semi-finished": withCategoryProducts("semi-finished", [
    {
      title: "Котлети курячі напівфабрикат, 700г",
      price: "126,00 грн",
      oldPrice: "149,00 грн",
      tags: ["sale"],
    },
    {
      title: "Нагетси курячі, 500г",
      price: "109,00 грн",
      tags: ["delivery-today", "brand"],
    },
  ]),
  "frozen-vegetables": withCategoryProducts("frozen-vegetables", [
    {
      title: "Овочева суміш по-селянськи, 400г",
      price: "68,90 грн",
      oldPrice: "79,90 грн",
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      title: "Броколі заморожена, 400г",
      price: "72,00 грн",
      tags: ["delivery-today"],
    },
  ]),
  "fish-seafood": withCategoryProducts("fish-seafood", [
    {
      title: "Філе хека заморожене, 800г",
      price: "169,00 грн",
      oldPrice: "189,00 грн",
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Креветка очищена, 500г",
      price: "259,00 грн",
      tags: ["brand"],
    },
  ]),
  "frozen-meat": withCategoryProducts("frozen-meat", [
    {
      title: "Фарш свинячо-яловичий, 900г",
      price: "189,00 грн",
      oldPrice: "219,00 грн",
      tags: ["sale"],
    },
    {
      title: "Стегно куряче заморожене, 1кг",
      price: "139,00 грн",
      tags: ["delivery-today"],
    },
  ]),

  "beauty-hygiene": withCategoryProducts("beauty-hygiene", [
    {
      title: "Гель для душу Fresh, 400мл",
      price: "94,90 грн",
      oldPrice: "109,00 грн",
      tags: ["sale", "brand"],
    },
    {
      title: "Шампунь Shampoo Care, 400мл",
      price: "149,00 грн",
      oldPrice: "189,00 грн",
      image: dealsImageMap["shampoo-1"],
      tags: ["sale"],
    },
  ]),
  "washing-cleaning": withCategoryProducts("washing-cleaning", [
    {
      title: "Порошок пральний Universal, 2кг",
      price: "219,00 грн",
      oldPrice: "259,00 грн",
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Засіб для миття посуду, 1л",
      price: "79,90 грн",
      tags: ["delivery-today", "brand"],
    },
  ]),
  "useful-items": withCategoryProducts("useful-items", [
    {
      title: "Пакети для сміття міцні, 60л x 20шт",
      price: "52,90 грн",
      oldPrice: "63,00 грн",
      tags: ["sale"],
    },
    {
      title: "Губки кухонні, набір 5шт",
      price: "29,90 грн",
      tags: ["delivery-today"],
    },
  ]),
  "household-chemistry": withCategoryProducts("household-chemistry", [
    {
      title: "Засіб для скла Crystal, 500мл",
      price: "74,90 грн",
      oldPrice: "89,90 грн",
      tags: ["sale", "delivery-today"],
    },
    {
      title: "Універсальний очищувач, 750мл",
      price: "99,90 грн",
      tags: ["brand"],
    },
  ]),
};

export const getCatalogProductsByCategoryId = (categoryId) =>
  catalogProductsByCategory[categoryId] || [];
