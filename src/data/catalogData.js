import { buildCatalogSectionHref } from "./catalogRouting";
import { catalogSectionsData } from "./catalogSectionsData";

const additionalCatalogGroups = [
  {
    id: "sales",
    title: "Акції",
    href: "/#promotions",
    items: [
      { id: "daily-discount", label: "Знижки дня", href: "/#promotions" },
      { id: "weekly-offers", label: "Тижневі пропозиції", href: "/#promotions" },
      { id: "combo", label: "Комбо-набори", href: "/#promotions" },
    ],
  },
  {
    id: "popular",
    title: "Популярне",
    href: buildCatalogSectionHref("supermarket"),
    items: [
      { id: "popular-bread", label: "Хліб та випічка", href: "/catalog/supermarket?category=bread-bakery" },
      { id: "popular-milk", label: "Молочні продукти", href: "/catalog/supermarket?category=milk-eggs" },
      { id: "popular-snacks", label: "Снеки", href: "/catalog/supermarket?category=snacks-dried-fruits" },
      { id: "popular-drinks", label: "Напої", href: "/catalog/supermarket?category=water-drinks" },
    ],
  },
];

const sectionGroups = catalogSectionsData.map((section) => ({
  id: section.id,
  title: section.sidebarLabel,
  href: buildCatalogSectionHref(section.id),
  items: section.items.map((item) => ({
    id: item.id,
    label: item.title,
    href: `/catalog/${section.id}?category=${item.id}`,
  })),
}));

export const catalogData = [...additionalCatalogGroups, ...sectionGroups];
