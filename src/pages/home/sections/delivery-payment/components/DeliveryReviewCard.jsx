import { IoStar, IoStarOutline } from "react-icons/io5";

import { deliveryAvocadoDecorImage } from "@/assets/images/home/delivery";
import styles from "../DeliveryPaymentSection.module.css";

const DeliveryReviewCard = () => {
  return (
    <div className={styles["delivery-payment-review"]}>
      <div className={styles["delivery-payment-review-content"]}>
        <div className={styles["delivery-payment-review-text"]}>
          <h3>ОЦІНІТЬ МАГАЗИН</h3>
          <p>
            Поділіться враженнями про замовлення і допоможіть зробити нас краще
          </p>
        </div>
        <div className={styles["delivery-payment-review-actions"]}>
          <div
            className={styles["delivery-payment-stars"]}
            aria-label="Рейтинг 4 з 5"
          >
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStarOutline />
          </div>

          <a href="#" className={styles["delivery-payment-review-button"]}>
            Залишити відгук
          </a>
        </div>
      </div>
      <div
        className={styles["delivery-payment-review-decor"]}
        aria-hidden="true"
      >
        <img src={deliveryAvocadoDecorImage} alt="" loading="lazy" />
      </div>
    </div>
  );
};

export default DeliveryReviewCard;
