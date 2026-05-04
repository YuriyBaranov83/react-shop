import styles from "../DeliveryPaymentSection.module.css";

const DeliveryPromoStrip = () => {
  return (
    <div className={styles["delivery-payment-promo"]}>
      <div className={styles["delivery-payment-promo-text"]}>
        <strong>БЕЗКОШТОВНА ДОСТАВКА + ЗНИЖКА 10%</strong>
        <span>першого замовлення</span>
        <span>на замовлення кулінарії</span>
      </div>

      <button
        type="button"
        className={styles["delivery-payment-promo-button"]}
        aria-disabled="true"
        disabled
      >
        Отримати промокод
      </button>
    </div>
  );
};

export default DeliveryPromoStrip;
