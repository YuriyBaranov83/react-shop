import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "../DeliveryPaymentSection.module.css";

const DeliveryPromoStrip = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  return (
    <div className={styles["delivery-payment-promo"]}>
      <div className={styles["delivery-payment-promo-text"]}>
        <strong>ДЕМО-ЗНИЖКА 10%</strong>
        <span>Спробуйте застосувати промокод у кошику</span>
        {isRevealed && <span role="status">Промокод: VESNA10. <Link to="/cart?promo=VESNA10">Перейти до кошика</Link></span>}
      </div>
      <button type="button" className={styles["delivery-payment-promo-button"]}
        onClick={() => setIsRevealed(true)} disabled={isRevealed}>{isRevealed ? "Промокод відкрито" : "Отримати промокод"}</button>
    </div>
  );
};
export default DeliveryPromoStrip;
