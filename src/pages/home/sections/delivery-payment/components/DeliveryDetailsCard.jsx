import { deliveryMapZoneImage } from "@/assets/images/home/delivery";
import { deliveryDetails } from "@/data/deliveryData";
import styles from "../DeliveryPaymentSection.module.css";



const DeliveryDetailsCard = () => {
  return (
    <div className={styles["delivery-payment-top"]}>
      <div className={styles["delivery-payment-details"]}>
        {deliveryDetails.map((rule) => (
          <div key={rule.title} className={styles["delivery-payment-rule"]}>
            <h3>{rule.title}</h3>
            {rule.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ))}

        <p className={styles["delivery-payment-note"]}>
          Зображення продуктів можуть відрізнятися від продуктів у замовленні.
        </p>
      </div>

      <div className={styles["delivery-payment-map-wrap"]}>
        <h3 className={styles["delivery-payment-map-title"]}>Карта доставки</h3>
        <div className={styles["delivery-payment-map"]}>
          <img src={deliveryMapZoneImage} alt="Карта зони доставки" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailsCard;
