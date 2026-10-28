import {
  promoComboPizzaImage,
  promoHolidayImage,
  promoPreorderImage,
} from "@/assets/images/home/promotions";
import homeCareImage from "@/assets/images/home/categories/other/household-chemistry.webp";

export const homePromotionsData = [
  {
    id: "preorder-culinary",
    variant: "preorder",
    title: "Смачні пропозиції кулінарії зі знижкою",
    href: "/catalog/culinary?filter=sale",
    badge: null,
    image: promoPreorderImage,
  },
  {
    id: "holiday-arrived",
    variant: "holiday",
    title: "Спробуйте демо-знижку 10%",
    badge: "VESNA10",
    href: "/cart?promo=VESNA10",
    image: promoHolidayImage,
  },
  {
    id: "third-item-discount",
    variant: "cleanline",
    title: "Товари для дому за вигідною ціною",
    href: "/catalog/other?filter=sale",
    badge: null,
    image: homeCareImage,
  },
  {
    id: "pizza-combo",
    variant: "combo",
    title: "Заощаджуйте 80 грн з демо-промокодом",
    badge: "SAVE80",
    href: "/cart?promo=SAVE80",
    image: promoComboPizzaImage,
  },
];

