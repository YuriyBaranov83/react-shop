import {
  promoCleanLineImage,
  promoComboPizzaImage,
  promoHolidayImage,
  promoPreorderImage,
} from "@/assets/images/home/promotions";

export const homePromotionsData = [
  {
    id: "preorder-culinary",
    variant: "preorder",
    title: "Зробіть передзамовлення у кулінарії зі знижкою",
    badge: null,
    image: promoPreorderImage,
  },
  {
    id: "holiday-arrived",
    variant: "holiday",
    title: "Свято до нас приходить",
    badge: "15% знижка",
    image: promoHolidayImage,
  },
  {
    id: "third-item-discount",
    variant: "cleanline",
    title: "Знижка на третій товар у кошику «Чиста Лінія»",
    badge: null,
    image: promoCleanLineImage,
  },
  {
    id: "pizza-combo",
    variant: "combo",
    title: "Комбо-набір 3 піци за 1500 ₴",
    badge: "trio1500",
    image: promoComboPizzaImage,
  },
];

