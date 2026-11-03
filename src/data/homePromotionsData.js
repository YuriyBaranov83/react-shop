import { PROMO_CODES } from "@/features/cart/model/checkout";

export const homePromotionsData = [
  {
    id: "weekly-table",
    variant: "market",
    eyebrow: "Знахідки на щодень",
    title: "Смачно обирати. Приємно заощаджувати.",
    text: "Усі товари зі знижками — в одній добірці. Знайдіть щось до свого столу.",
    href: "/catalog/supermarket?filter=sale",
    action: "Обрати пропозиції",
  },
  {
    id: "first-basket",
    variant: "sunny",
    eyebrow: "Трохи вигоди до кошика",
    title: `−${PROMO_CODES.VESNA10.value}%`,
    text: "На вартість товарів у кошику. Один промокод на замовлення.",
    href: "/cart?promo=VESNA10",
    code: "VESNA10",
    action: "Спробувати в кошику",
  },
  {
    id: "easy-dinner",
    variant: "cream",
    eyebrow: "Маленький приємний бонус",
    title: `−${PROMO_CODES.SAVE80.value / 100} грн`,
    text: "Від вартості товарів, але не більше суми кошика. Оберіть свій промокод.",
    href: "/cart?promo=SAVE80",
    code: "SAVE80",
    action: "Спробувати в кошику",
  },
];
