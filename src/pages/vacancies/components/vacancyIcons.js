import {
  MdCall,
  MdCalculate,
  MdDirectionsBike,
  MdInventory2,
  MdStorefront,
  MdWork,
} from "react-icons/md";
import { FaBasketShopping, FaChartLine, FaCashRegister } from "react-icons/fa6";

const fallbackIconMap = {
  cashier: MdCalculate,
  "bike-courier": MdDirectionsBike,
  seller: FaBasketShopping,
  "hall-manager": MdStorefront,
  "call-center-operator": MdCall,
  "senior-cashier": FaCashRegister,
  loader: MdInventory2,
  accountant: FaChartLine,
};

const iconModules = import.meta.glob(
  "/src/assets/icons/vacancies/*.{svg,png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

const iconSrcMap = Object.entries(iconModules).reduce((map, [filePath, src]) => {
  const fileName = filePath.split("/").at(-1) || "";
  const iconKey = fileName.replace(/\.[^/.]+$/, "");
  map[iconKey] = src;
  return map;
}, {});

export const getVacancyIcon = (iconName) => ({
  src: iconSrcMap[iconName] ?? null,
  FallbackIcon: fallbackIconMap[iconName] ?? MdWork,
});
