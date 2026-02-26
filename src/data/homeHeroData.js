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
    href: "#",
  },
  {
    id: "cakes",
    image: slideCakes,
    title: "Готові страви на кожен день без зайвих турбот",
    buttonText: "Обрати меню",
    href: "#",
  },
  {
    id: "supermarket",
    image: slideSupermarket,
    title: "Свіжі продукти для вашого дому з доставкою",
    buttonText: "Дивитись товари",
    href: "#",
  },
  {
    id: "karola",
    image: slideKarola,
    title: "Знижки тижня на улюблені позиції",
    buttonText: "Переглянути акції",
    href: "#",
  },
];

export const homeHeroBanners = [
  {
    id: "cashback",
    image: bannerTop,
    title: "Кешбек з кожної покупки",
    href: "#",
    tone: "light",
  },
  {
    id: "review",
    image: bannerBottom,
    title: "Залиште відгук і отримайте 5% знижки",
    href: "#",
    tone: "dark",
  },
];
