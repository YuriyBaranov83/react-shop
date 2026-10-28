const amountFormatter = new Intl.NumberFormat("uk-UA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatMoney = (kopecks) => `${amountFormatter.format(kopecks / 100)} грн`;

export const getDiscountPercent = (price, oldPrice) =>
  oldPrice > price && price >= 0 ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
