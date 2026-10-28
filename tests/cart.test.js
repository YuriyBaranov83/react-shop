import test from "node:test";
import assert from "node:assert/strict";
import { normalizeCartItems, normalizeFavoriteIds, normalizeQuantity } from "../src/features/cart/model/cartModel.js";
import { calculateCartTotals, hasPromoCode } from "../src/features/cart/model/checkout.js";
import { formatMoney, getDiscountPercent } from "../src/utils/money.js";
import { readStoredValue, writeStoredValue } from "../src/utils/storage.js";

const coffeeId = "coffee-tea-sweets-product-1";
const products = new Map([[coffeeId, { id: coffeeId, stock: 12 }], ["bread-bakery-product-1", { stock: 5 }]]);

test("saved home/catalog duplicates migrate to one product without losing quantity", () => {
  assert.deepEqual(normalizeCartItems([
    { id: "cofe-1", quantity: 2 }, { id: coffeeId, quantity: 3 },
    { id: "coffee-tea-sweets-product-3", quantity: 1 }, { id: "missing", quantity: 10 },
  ], products), [{ id: coffeeId, quantity: 6 }]);
});

test("saved duplicates are clamped to stock; invalid and zero quantities are discarded", () => {
  assert.deepEqual(normalizeCartItems([
    { id: "cofe-1", quantity: 10 }, { id: coffeeId, quantity: 10 },
    { id: "bread-bakery-product-1", quantity: Infinity },
  ], products), [{ id: coffeeId, quantity: 12 }]);
  assert.deepEqual(normalizeCartItems(null, products), []);
  assert.equal(normalizeQuantity(-4, 12), 0);
  assert.equal(normalizeQuantity("3.9", 12), 3);
  assert.equal(normalizeQuantity(NaN, 12), 0);
  assert.equal(normalizeQuantity(true, 12), 0);
});

test("favorites migrate aliases, remove unknown products and deduplicate", () => {
  assert.deepEqual(normalizeFavoriteIds(["cofe-1", coffeeId, "coffee-tea-sweets-product-5", null, "missing"], products), [coffeeId]);
});

test("percentage discounts round in kopecks and the receipt reconciles", () => {
  const totals = calculateCartTotals([{ price: 5990, oldPrice: 6990, quantity: 3 }], { promoCode: " vesna10 " });
  assert.equal(totals.promoDiscount, 1797);
  assert.equal(totals.productDiscount, 3000);
  assert.equal(totals.originalSubtotal - totals.productDiscount - totals.promoDiscount - totals.bonusDiscount + totals.delivery, totals.payable);
  assert.equal(totals.payable, 21173);
});

test("delivery changes at the exact post-discount threshold", () => {
  assert.equal(calculateCartTotals([{ price: 30000, quantity: 1 }]).delivery, 0);
  assert.equal(calculateCartTotals([{ price: 29999, quantity: 1 }]).delivery, 5000);
  assert.equal(calculateCartTotals([{ price: 30000, quantity: 1 }], { promoCode: "SAVE80" }).delivery, 5000);
  assert.equal(calculateCartTotals([{ price: 40000, quantity: 1 }], { useBonuses: true, bonusBalance: 100 }).delivery, 0);
});

test("fixed discounts and bonuses cannot produce a negative merchandise total", () => {
  const totals = calculateCartTotals([{ price: 3290, quantity: 1 }], { promoCode: "SAVE80", useBonuses: true, bonusBalance: 100 });
  assert.equal(totals.promoDiscount, 3290);
  assert.equal(totals.bonusDiscount, 0);
  assert.equal(totals.payable, 5000);
  assert.equal(calculateCartTotals([]).payable, 0);
  assert.equal(hasPromoCode("constructor"), false);
});

test("bonus balance is independent of basket value", () => {
  const totals = calculateCartTotals([{ price: 50000, quantity: 1 }], { useBonuses: true, bonusBalance: 25 });
  assert.equal(totals.bonusDiscount, 2500);
  assert.equal(calculateCartTotals([{ price: 50000, quantity: 1 }], { useBonuses: true }).bonusDiscount, 0);
});

test("money formatting and discount badges share one calculation", () => {
  assert.equal(formatMoney(123456).replace(/\s/g, ""), "1234,56грн");
  assert.equal(getDiscountPercent(18900, 22900), 17);
  assert.equal(getDiscountPercent(18900, 0), 0);
});

test("unavailable storage and malformed saved JSON leave the shop usable", () => {
  const originalWindow = globalThis.window;
  try {
    globalThis.window = { localStorage: { getItem: () => "{broken", setItem: () => { throw new Error("QuotaExceededError"); } } };
    assert.equal(readStoredValue("cart"), null);
    assert.equal(writeStoredValue("cart", []), false);
    globalThis.window = { get localStorage() { throw new Error("SecurityError"); } };
    assert.equal(readStoredValue("cart"), null);
    assert.equal(writeStoredValue("cart", []), false);
  } finally {
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  }
});
