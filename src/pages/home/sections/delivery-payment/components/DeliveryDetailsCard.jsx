import { deliveryMapZoneImage } from "@/assets/images/home/delivery";
import styles from "../DeliveryPaymentSection.module.css";

const deliveryRules = [
    {
    title: "Зони доставки",
    lines: [
      "Доставка здійснюється в районі ЖК «Варшавський Плюс»",
      "(просп. Європейського Союзу) і ЖК «Файна Таун» (вул. Салютна).",
    ],
  },
  {
    title: "25 хвилин",
    lines: [
      "Доставка 25 хвилин. Приймаємо замовлення",
      "з 7:00 до 23:00.",
    ],
  },
  {
    title: "300 грн",
    lines: [
      "Мінімальна сума безплатної доставки з урахуванням знижок.",
      "Інакше вартість доставки 50 грн.",
    ],
  },
  {
    title: "Оплата",
    lines: [
      "При оформленні замовлення ви можете вибрати",
      "зручний для вас спосіб розрахунку.",
    ],
  },
];

const DeliveryDetailsCard = () => {
  return (
    <div className={styles["delivery-payment-top"]}>
      <div className={styles["delivery-payment-details"]}>
        {deliveryRules.map((rule) => (
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
