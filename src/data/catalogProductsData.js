import {
  homeCulinaryTiles,
  homeFrozenTiles,
  homeOtherTiles,
  homeSupermarketTiles,
} from "./homeCategoryTilesData";
import {
  dealCheesyImage, dealCofeImage, dealColaImage,
  dealShampooImage, dealSlipersImage, dealVineImage,
} from "@/assets/images/home/deals";

const categoryImageMap = new Map(
  [
    ...homeSupermarketTiles,
    ...homeCulinaryTiles,
    ...homeFrozenTiles,
    ...homeOtherTiles,
  ].map((item) => [item.id, item.image])
);

const dealsImageMap = {
  "cofe-1": dealCofeImage,
  "cola-1": dealColaImage,
  "shampoo-1": dealShampooImage,
};

const withCategoryProducts = (categoryId, products) =>
  products.map((product) => ({
    ...product,
    stock: product.stock ?? 24,
    availability: `В наявності ${product.stock ?? 24} шт`,
    image: product.image || categoryImageMap.get(categoryId),
  }));

export const catalogProductsByCategory = {
  "water-drinks": withCategoryProducts("water-drinks", [
    {
      id: "water-drinks-product-1",
      title: "Вода мінеральна Urbanfood, 1.5л",
      price: 3290,
      oldPrice: 3990,
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      id: "water-drinks-product-2",
      title: "Напій Cola Classic, 1.5л",
      price: 5490,
      oldPrice: 6990,
      image: dealsImageMap["cola-1"],
      tags: ["sale", "delivery-today"],
    },
    {
      id: "water-drinks-product-wine",
      title: "Вино червоне Vine Reserve сухе, 0.75л",
      price: 24900,
      oldPrice: 32900,
      image: dealVineImage,
      tags: ["sale"],
    },
  ]),
  "milk-eggs": withCategoryProducts("milk-eggs", [
    {
      id: "milk-eggs-product-1",
      title: "Молоко фермерське 2.5%, 900мл",
      price: 4650,
      oldPrice: 5200,
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      id: "milk-eggs-product-2",
      title: "Яйця курячі C1, 10 шт",
      price: 6190,
      tags: ["delivery-today"],
    },
    {
      id: "milk-eggs-product-cheese",
      title: "Сир твердий Cheesy фермерський, 180г",
      price: 16900,
      oldPrice: 21900,
      image: dealCheesyImage,
      tags: ["sale", "delivery-today"],
    },
  ]),
  "snacks-dried-fruits": withCategoryProducts("snacks-dried-fruits", [
    {
      id: "snacks-dried-fruits-product-1",
      title: "Чіпси кукурудзяні з сиром, 140г",
      price: 4890,
      oldPrice: 5990,
      tags: ["sale"],
    },
    {
      id: "snacks-dried-fruits-product-2",
      title: "Мікс горіхів та сухофруктів, 200г",
      price: 12900,
      tags: ["delivery-today", "brand"],
    },
  ]),
  "coffee-tea-sweets": withCategoryProducts("coffee-tea-sweets", [
    {
      id: "coffee-tea-sweets-product-1",
      title: "Кава мелена Arabica Gold, 250г",
      price: 18900,
      oldPrice: 22900,
      image: dealsImageMap["cofe-1"],
      tags: ["sale", "delivery-today"],
    },
    {
      id: "coffee-tea-sweets-product-2",
      title: "Чай чорний цейлонський, 100 пакетиків",
      price: 9350,
      tags: ["brand"],
    },
  ]),
  "pasta-groats": withCategoryProducts("pasta-groats", [
    {
      id: "pasta-groats-product-1",
      title: "Макарони з твердих сортів, 500г",
      price: 4990,
      oldPrice: 6200,
      tags: ["sale", "delivery-today"],
    },
    {
      id: "pasta-groats-product-2",
      title: "Рис довгозернистий, 900г",
      price: 7290,
      tags: ["delivery-today"],
    },
  ]),
  "bread-bakery": withCategoryProducts("bread-bakery", [
    {
      id: "bread-bakery-product-1",
      title: "Хліб Бородинський, 450г",
      price: 5990,
      oldPrice: 6990,
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      id: "bread-bakery-product-2",
      title: "Хліб житньо-пшеничний, 500г",
      price: 6390,
      oldPrice: 7490,
      tags: ["sale", "delivery-today", "brand"],
    },
  ]),
  "oils-sauces-spices": withCategoryProducts("oils-sauces-spices", [
    {
      id: "oils-sauces-spices-product-1",
      title: "Олія соняшникова рафінована, 850мл",
      price: 7190,
      tags: ["delivery-today", "brand"],
    },
    {
      id: "oils-sauces-spices-product-2",
      title: "Соус томатний гострий, 320г",
      price: 4390,
      oldPrice: 5200,
      tags: ["sale"],
    },
  ]),
  "canned-pickles": withCategoryProducts("canned-pickles", [
    {
      id: "canned-pickles-product-1",
      title: "Горошок консервований, 420г",
      price: 4990,
      oldPrice: 5990,
      tags: ["sale", "delivery-today"],
    },
    {
      id: "canned-pickles-product-2",
      title: "Кукурудза солодка, 340г",
      price: 4750,
      tags: ["delivery-today", "brand"],
    },
  ]),

  pastries: withCategoryProducts("pastries", [
    {
      id: "pastries-product-1",
      title: "Круасан вершковий, 80г",
      price: 3690,
      oldPrice: 4290,
      tags: ["sale", "delivery-today"],
    },
    {
      id: "pastries-product-2",
      title: "Булочка з корицею, 110г",
      price: 3450,
      tags: ["delivery-today", "brand"],
    },
  ]),
  pizza: withCategoryProducts("pizza", [
    {
      id: "pizza-product-1",
      title: "Піца Маргарита, 420г",
      price: 18900,
      oldPrice: 21900,
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      id: "pizza-product-2",
      title: "Піца з шинкою та сиром, 460г",
      price: 20900,
      tags: ["delivery-today"],
    },
  ]),
  "grill-menu": withCategoryProducts("grill-menu", [
    {
      id: "grill-menu-product-1",
      title: "Курка гриль, 1кг",
      price: 28900,
      oldPrice: 32900,
      tags: ["sale", "delivery-today"],
    },
    {
      id: "grill-menu-product-2",
      title: "Ковбаски гриль, 600г",
      price: 19900,
      tags: ["brand"],
    },
  ]),
  "fresh-meat": withCategoryProducts("fresh-meat", [
    {
      id: "fresh-meat-product-1",
      title: "Філе куряче охолоджене, 1кг",
      price: 17900,
      oldPrice: 19900,
      tags: ["sale", "delivery-today"],
    },
    {
      id: "fresh-meat-product-2",
      title: "Шия свиняча охолоджена, 1кг",
      price: 23900,
      tags: ["delivery-today"],
    },
  ]),
  salads: withCategoryProducts("salads", [
    {
      id: "salads-product-1",
      title: "Салат Цезар, 250г",
      price: 12900,
      oldPrice: 14900,
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      id: "salads-product-2",
      title: "Салат Грецький, 240г",
      price: 11900,
      tags: ["delivery-today"],
    },
  ]),
  soups: withCategoryProducts("soups", [
    {
      id: "soups-product-1",
      title: "Борщ український, 450г",
      price: 8900,
      oldPrice: 9900,
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      id: "soups-product-2",
      title: "Суп курячий з локшиною, 400г",
      price: 7900,
      tags: ["delivery-today"],
    },
  ]),
  "hot-dishes": withCategoryProducts("hot-dishes", [
    {
      id: "hot-dishes-product-1",
      title: "Котлета по-київськи з гарніром, 320г",
      price: 14900,
      oldPrice: 17900,
      tags: ["sale", "delivery-today"],
    },
    {
      id: "hot-dishes-product-2",
      title: "Плов з куркою, 350г",
      price: 11900,
      tags: ["delivery-today", "brand"],
    },
  ]),
  desserts: withCategoryProducts("desserts", [
    {
      id: "desserts-product-1",
      title: "Торт медовий, 550г",
      price: 24900,
      oldPrice: 28900,
      tags: ["sale", "brand"],
    },
    {
      id: "desserts-product-2",
      title: "Еклер заварний, 90г",
      price: 4500,
      tags: ["delivery-today"],
    },
  ]),

  dumplings: withCategoryProducts("dumplings", [
    {
      id: "dumplings-product-1",
      title: "Пельмені домашні, 800г",
      price: 13490,
      oldPrice: 15990,
      tags: ["sale", "delivery-today"],
    },
    {
      id: "dumplings-product-2",
      title: "Вареники з картоплею, 900г",
      price: 10990,
      tags: ["brand"],
    },
  ]),
  "khinkali-manty": withCategoryProducts("khinkali-manty", [
    {
      id: "khinkali-manty-product-1",
      title: "Хінкалі з яловичиною, 900г",
      price: 16900,
      oldPrice: 19900,
      tags: ["sale"],
    },
    {
      id: "khinkali-manty-product-2",
      title: "Манти зі свининою, 1кг",
      price: 17900,
      tags: ["delivery-today"],
    },
  ]),
  "semi-finished": withCategoryProducts("semi-finished", [
    {
      id: "semi-finished-product-1",
      title: "Котлети курячі напівфабрикат, 700г",
      price: 12600,
      oldPrice: 14900,
      tags: ["sale"],
    },
    {
      id: "semi-finished-product-2",
      title: "Нагетси курячі, 500г",
      price: 10900,
      tags: ["delivery-today", "brand"],
    },
  ]),
  "frozen-vegetables": withCategoryProducts("frozen-vegetables", [
    {
      id: "frozen-vegetables-product-1",
      title: "Овочева суміш по-селянськи, 400г",
      price: 6890,
      oldPrice: 7990,
      tags: ["sale", "delivery-today", "brand"],
    },
    {
      id: "frozen-vegetables-product-2",
      title: "Броколі заморожена, 400г",
      price: 7200,
      tags: ["delivery-today"],
    },
  ]),
  "fish-seafood": withCategoryProducts("fish-seafood", [
    {
      id: "fish-seafood-product-1",
      title: "Філе хека заморожене, 800г",
      price: 16900,
      oldPrice: 18900,
      tags: ["sale", "delivery-today"],
    },
    {
      id: "fish-seafood-product-2",
      title: "Креветка очищена, 500г",
      price: 25900,
      tags: ["brand"],
    },
  ]),
  "frozen-meat": withCategoryProducts("frozen-meat", [
    {
      id: "frozen-meat-product-1",
      title: "Фарш свинячо-яловичий, 900г",
      price: 18900,
      oldPrice: 21900,
      tags: ["sale"],
    },
    {
      id: "frozen-meat-product-2",
      title: "Стегно куряче заморожене, 1кг",
      price: 13900,
      tags: ["delivery-today"],
    },
  ]),

  "beauty-hygiene": withCategoryProducts("beauty-hygiene", [
    {
      id: "beauty-hygiene-product-1",
      title: "Гель для душу Fresh, 400мл",
      price: 9490,
      oldPrice: 10900,
      tags: ["sale", "brand"],
    },
    {
      id: "beauty-hygiene-product-2",
      title: "Шампунь Shampoo Care, 400мл",
      price: 14900,
      oldPrice: 18900,
      image: dealsImageMap["shampoo-1"],
      tags: ["sale"],
    },
  ]),
  "washing-cleaning": withCategoryProducts("washing-cleaning", [
    {
      id: "washing-cleaning-product-1",
      title: "Порошок пральний Universal, 2кг",
      price: 21900,
      oldPrice: 25900,
      tags: ["sale", "delivery-today"],
    },
    {
      id: "washing-cleaning-product-2",
      title: "Засіб для миття посуду, 1л",
      price: 7990,
      tags: ["delivery-today", "brand"],
    },
  ]),
  "useful-items": withCategoryProducts("useful-items", [
    {
      id: "useful-items-product-1",
      title: "Пакети для сміття міцні, 60л x 20шт",
      price: 5290,
      oldPrice: 6300,
      tags: ["sale"],
    },
    {
      id: "useful-items-product-2",
      title: "Губки кухонні, набір 5шт",
      price: 2990,
      tags: ["delivery-today"],
    },
    {
      id: "useful-items-product-slippers",
      title: "Капці Slipers домашні теплі, розмір 40–44",
      price: 29900,
      oldPrice: 39900,
      image: dealSlipersImage,
      tags: ["sale"],
    },
  ]),
  "household-chemistry": withCategoryProducts("household-chemistry", [
    {
      id: "household-chemistry-product-1",
      title: "Засіб для скла Crystal, 500мл",
      price: 7490,
      oldPrice: 8990,
      tags: ["sale", "delivery-today"],
    },
    {
      id: "household-chemistry-product-2",
      title: "Універсальний очищувач, 750мл",
      price: 9990,
      tags: ["brand"],
    },
  ]),
};

export const getCatalogProductsByCategoryId = (categoryId) =>
  catalogProductsByCategory[categoryId] || [];
