import styles from "../DeliveryPaymentSection.module.css";

const DeliveryPromoStrip = () => {
  return (
    <div className={styles["delivery-payment-promo"]}>
      <div className={styles["delivery-payment-promo-text"]}>
        <strong>БЕЗКОШТОВНА ДОСТАВКА + ЗНИЖКА 10%</strong>
        <span>першого замовлення</span>
        <span>на замовлення кулінарії</span>
      </div>

      <a href="#" className={styles["delivery-payment-promo-button"]}>
        Отримати промокод
      </a>
    </div>
  );
};

export default DeliveryPromoStrip;
