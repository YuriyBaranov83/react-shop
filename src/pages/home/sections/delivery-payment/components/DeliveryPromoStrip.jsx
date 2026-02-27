import styles from "../DeliveryPaymentSection.module.css";

const DeliveryPromoStrip = () => {
  return (
    <div className={styles.deliveryPayment__promo}>
      <div className={styles.deliveryPayment__promoText}>
        <strong>БЕЗКОШТОВНА ДОСТАВКА + ЗНИЖКА 10%</strong>
        <span>першого замовлення</span>
        <span>на замовлення кулінарії</span>
      </div>

      <a href="#" className={styles.deliveryPayment__promoButton}>
        Отримати промокод
      </a>
    </div>
  );
};

export default DeliveryPromoStrip;
