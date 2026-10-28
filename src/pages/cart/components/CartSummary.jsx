import { useId, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FormField from "@/components/ui/FormField/FormField";
import { calculateCartTotals, DEMO_BONUS_BALANCE, hasPromoCode, normalizePromoCode } from "@/features/cart/model/checkout";
import { deliveryRules } from "@/data/deliveryData";
import { formatMoney } from "@/utils/money";
import styles from "../CartPage.module.css";

const CartSummary = ({ products }) => {
  const [searchParams] = useSearchParams();
  const [promoInput, setPromoInput] = useState(() => searchParams.get("promo") || "");
  const [promoCode, setPromoCode] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [useBonuses, setUseBonuses] = useState(false);
  const formId = useId();
  const discountLabel = (value) => `${value > 0 ? "−" : ""}${formatMoney(value)}`;
  const totals = calculateCartTotals(products, { promoCode, useBonuses, bonusBalance: DEMO_BONUS_BALANCE });
  const rows = [
    { id: "products", label: `Товари (${totals.quantity})`, value: formatMoney(totals.originalSubtotal) },
    { id: "discount", label: "Знижки на товари", value: discountLabel(totals.productDiscount) },
    { id: "promo", label: "Промокод", value: discountLabel(totals.promoDiscount) },
    { id: "bonus", label: "Бонуси", value: discountLabel(totals.bonusDiscount) },
    { id: "delivery", label: "Доставка", value: totals.delivery ? formatMoney(totals.delivery) : "Безкоштовно" },
  ];
  const applyPromo = (event) => {
    event.preventDefault();
    const code = normalizePromoCode(promoInput);
    if (!hasPromoCode(code)) {
      setFeedback({ error: true, text: "Промокод не знайдено. Спробуйте VESNA10 або SAVE80." });
      return;
    }
    setPromoCode(code);
    setFeedback({ error: false, text: `Промокод ${code} застосовано.` });
  };

  return (
    <aside className={styles["cart-summary"]} aria-label="Підсумок кошика">
      <h2 className={styles["cart-summary-delivery-title"]}>Доставка (демо)</h2>
      <p className={styles["cart-summary-address"]}>
        Безкоштовно від {formatMoney(deliveryRules.freeFrom)} після знижок, інакше — {formatMoney(deliveryRules.fee)}.
      </p>
      <FormField id={`${formId}-address`} label="Адреса для прикладу (необов'язково)">
        <input id={`${formId}-address`} name="delivery-address" type="text" maxLength={160} autoComplete="street-address" />
      </FormField>
      <p className={styles["cart-summary-submit-note"]}>Час доставки не бронюється. Адреса не надсилається та не зберігається.</p>
      <form className={styles["cart-summary-promo"]} onSubmit={applyPromo}>
        <label htmlFor={`${formId}-promo`} className="visually-hidden">Промокод</label>
        <input id={`${formId}-promo`} type="text" placeholder="Є промокод?" value={promoInput}
          onChange={(event) => { setPromoInput(event.target.value); setFeedback(null); }}
          aria-invalid={feedback?.error || false} aria-describedby={feedback ? `${formId}-feedback` : undefined} required maxLength={30} />
        <button type="submit">Застосувати</button>
      </form>
      {feedback && <p id={`${formId}-feedback`} role={feedback.error ? "alert" : "status"}
        className={`${styles["cart-summary-promo-feedback"]} ${feedback.error ? styles["cart-summary-promo-feedback-error"] : styles["cart-summary-promo-feedback-success"]}`}>
        {feedback.text}
      </p>}
      {promoCode && <button type="button" className={styles["cart-summary-promo-clear"]}
        onClick={() => { setPromoCode(""); setPromoInput(""); setFeedback({ error: false, text: "Промокод скасовано." }); }}>
        Скасувати промокод {promoCode}
      </button>}
      <button type="button" className={`${styles["cart-summary-bonuses"]} ${useBonuses ? styles["cart-summary-bonuses-active"] : ""}`}
        onClick={() => setUseBonuses((value) => !value)} aria-pressed={useBonuses}>
        <span aria-hidden="true" /><strong>Списати демо-бонуси</strong><span>Баланс: {DEMO_BONUS_BALANCE}</span>
      </button>
      <dl className={styles["cart-summary-list"]}>
        {rows.map((row) => <div key={row.id}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}
      </dl>
      <div className={styles["cart-summary-total"]}>
        <span>До сплати</span><strong aria-live="polite" aria-atomic="true">{formatMoney(totals.payable)}</strong>
      </div>
      <button type="button" className={styles["cart-summary-submit"]} disabled aria-describedby={`${formId}-checkout-note`}>Оформити замовлення</button>
      <p id={`${formId}-checkout-note`} className={styles["cart-summary-submit-note"]}>
        Це демо-магазин. Оформлення замовлень і оплата недоступні.
      </p>
    </aside>
  );
};
export default CartSummary;
