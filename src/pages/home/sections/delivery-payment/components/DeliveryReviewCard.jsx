import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { deliveryAvocadoDecorImage } from "@/assets/images/home/delivery";
import styles from "../DeliveryPaymentSection.module.css";

const DeliveryReviewCard = () => {
  const [rating, setRating] = useState(0);
  return (
    <div className={styles["delivery-payment-review"]}>
      <div className={styles["delivery-payment-review-content"]}>
        <div className={styles["delivery-payment-review-text"]}>
          <h3>ОЦІНІТЬ ДЕМО-МАГАЗИН</h3>
          <p>Спробуйте вибрати оцінку. У демо-версії вона не надсилається та не зберігається.</p>
          {rating > 0 && <p role="status">Ваша демо-оцінка: {rating} з 5. Дякуємо!</p>}
        </div>
        <div className={styles["delivery-payment-review-actions"]}>
          <div className={styles["delivery-payment-stars"]} role="group" aria-label="Оцінка магазину">
            {[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" aria-label={`Оцінити на ${value} з 5`}
              aria-pressed={rating === value} onClick={() => setRating(value)}>
              {value <= rating ? <IoStar aria-hidden="true" /> : <IoStarOutline aria-hidden="true" />}
            </button>)}
          </div>
        </div>
      </div>
      <div className={styles["delivery-payment-review-decor"]} aria-hidden="true">
        <img src={deliveryAvocadoDecorImage} alt="" loading="lazy" width="220" height="220" />
      </div>
    </div>
  );
};
export default DeliveryReviewCard;
