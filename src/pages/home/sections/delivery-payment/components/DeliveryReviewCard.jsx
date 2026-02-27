import { IoStar, IoStarOutline } from "react-icons/io5";

import { deliveryAvocadoDecorImage } from "@/assets/images/home/delivery";
import styles from "../DeliveryPaymentSection.module.css";

const DeliveryReviewCard = () => {
  return (
    <div className={styles.deliveryPayment__review}>
      <div className={styles.deliveryPayment__reviewContent}>
        <h3>ОЦІНІТЬ МАГАЗИН</h3>
        <p>Поділіться враженнями про замовлення і допоможіть зробити нас краще</p>

        <div className={styles.deliveryPayment__reviewActions}>
          <div className={styles.deliveryPayment__stars} aria-label="Рейтинг 4 з 5">
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStarOutline />
          </div>

          <a href="#" className={styles.deliveryPayment__reviewButton}>
            Залишити відгук
          </a>
        </div>
      </div>

      <img
        className={styles.deliveryPayment__reviewDecor}
        src={deliveryAvocadoDecorImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
    </div>
  );
};

export default DeliveryReviewCard;
