import { editorialPhotography } from "./marketPhotography";
export const homePromotionsData = [
  {
    id: "weekly-table",
    variant: "preorder",
    title: "Смачний план на тиждень",
    text: "Знайдіть свої улюблені пропозиції",
    href: "/catalog/supermarket?filter=sale",
    badge: null,
    image: editorialPhotography.hero,
  },
  {
    id: "first-basket",
    variant: "holiday",
    title: "Знайомство зі смаком",
    text: "Спробуйте демо-знижку 10%",
    href: "/cart?promo=VESNA10",
    badge: "VESNA10",
    image: editorialPhotography.bakery,
  },
  {
    id: "easy-dinner",
    variant: "combo",
    title: "Менше турбот. Більше смаку.",
    text: "Демо-промокод на 80 грн",
    href: "/cart?promo=SAVE80",
    badge: "SAVE80",
    image: editorialPhotography.kitchen,
  },
];
