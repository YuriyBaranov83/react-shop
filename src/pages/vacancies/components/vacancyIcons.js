import {
  IoCalculatorOutline,
  IoBicycleOutline,
  IoBasketOutline,
  IoStorefrontOutline,
  IoCallOutline,
  IoCardOutline,
  IoCubeOutline,
  IoStatsChartOutline,
  IoBriefcaseOutline,
} from "react-icons/io5";
const icons = {
  cashier: IoCalculatorOutline,
  "bike-courier": IoBicycleOutline,
  seller: IoBasketOutline,
  "hall-manager": IoStorefrontOutline,
  "call-center-operator": IoCallOutline,
  "senior-cashier": IoCardOutline,
  loader: IoCubeOutline,
  accountant: IoStatsChartOutline,
};
export const getVacancyIcon = (name) => ({
  src: null,
  FallbackIcon: icons[name] || IoBriefcaseOutline,
});
