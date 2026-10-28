import { deliveryRules } from "../../../data/deliveryData.js";

export const PROMO_CODES = {
  VESNA10: { type: "percent", value: 10 },
  SAVE80: { type: "fixed", value: 8000 },
};

export const DEMO_BONUS_BALANCE = 100;
export const normalizePromoCode = (value = "") => value.trim().toUpperCase();
export const hasPromoCode = (code) => Object.hasOwn(PROMO_CODES, normalizePromoCode(code));

export const calculateCartTotals = (items, { promoCode = "", useBonuses = false, bonusBalance = 0 } = {}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalSubtotal = items.reduce(
    (sum, item) => sum + Math.max(item.oldPrice || 0, item.price) * item.quantity, 0
  );
  const code = normalizePromoCode(promoCode);
  const promo = hasPromoCode(code) ? PROMO_CODES[code] : null;
  const promoDiscount = promo
    ? Math.min(subtotal, promo.type === "percent" ? Math.round(subtotal * promo.value / 100) : promo.value)
    : 0;
  const afterPromo = subtotal - promoDiscount;
  const bonusDiscount = useBonuses ? Math.min(afterPromo, Math.max(0, Math.floor(bonusBalance)) * 100) : 0;
  const afterDiscounts = afterPromo - bonusDiscount;
  const delivery = items.length && afterDiscounts < deliveryRules.freeFrom ? deliveryRules.fee : 0;

  return {
    subtotal,
    originalSubtotal,
    productDiscount: originalSubtotal - subtotal,
    promoDiscount,
    bonusDiscount,
    delivery,
    payable: afterDiscounts + delivery,
    quantity: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};
