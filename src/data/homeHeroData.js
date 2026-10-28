import slideKulinariy from "@/assets/images/home/hero/kulinariy.webp";
import slideCakes from "@/assets/images/home/hero/cakes.webp";
import slideSupermarket from "@/assets/images/home/hero/supermarket.webp";
import slideKarola from "@/assets/images/home/hero/karola.webp";
import bannerTop from "@/assets/images/home/hero/banner-hero-1.webp";
import bannerBottom from "@/assets/images/home/hero/banner-hero-2.webp";

export const homeHeroSlides = [
  {
    id: "kulinariy",
    image: slideKulinariy,
    title: "Почніть день зі смачною випічкою з нашої кулінарії",
    buttonText: "Перейти до покупок",
    href: "/catalog/culinary?category=pastries",
  },
  {
    id: "cakes",
    image: slideCakes,
    title: "Готові страви на кожен день без зайвих турбот",
    buttonText: "Обрати меню",
    href: "/catalog/culinary",
  },
  {
    id: "supermarket",
    image: slideSupermarket,
    title: "Свіжі продукти для вашого дому з доставкою",
    buttonText: "Дивитись товари",
    href: "/catalog/supermarket",
  },
  {
    id: "karola",
    image: slideKarola,
    title: "Знижки тижня на улюблені позиції",
    buttonText: "Переглянути акції",
    href: "/#promotions",
  },
];

export const homeHeroBanners = [
  {
    id: "cashback",
    image: bannerTop,
    title: "Безкоштовна доставка від 300 грн",
    href: "/#delivery-payment",
    tone: "light",
  },
  {
    id: "review",
    image: bannerBottom,
    title: "Спробуйте знижку 10% з демо-промокодом",
    href: "/#delivery-payment",
    tone: "dark",
  },
];
