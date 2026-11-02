import Button from "@/components/ui/Button/Button";
import styles from "./ProfilePopover.module.css";
import {
  IoPricetagOutline,
  IoBicycleOutline,
  IoHeartOutline,
} from "react-icons/io5";

const benefits = [
  {
    id: "discount",
    Icon: IoPricetagOutline,
    text: "Знайомтеся з пропозиціями магазину",
  },
  {
    id: "delivery",
    Icon: IoBicycleOutline,
    text: "Переглядайте умови доставки",
  },
  { id: "favorite", Icon: IoHeartOutline, text: "Зберігайте улюблені товари" },
];

const ProfilePopover = ({ isOpen, onLoginClick, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      id="header-profile-popover"
      className={styles["profile-popover"]}
      role="region"
      aria-label="Профіль"
    >
      <div className={styles["profile-guest"]}>
        <p className={styles["profile-title"]}>Вітаємо в Urbanfood</p>
        <ul className={styles["profile-benefits"]}>
          {benefits.map((item) => (
            <li
              key={item.id}
              className={`${styles["profile-benefit"]} ${styles["profile-benefit-with-icon"]}`}
            >
              <item.Icon
                aria-hidden="true"
                className={styles["profile-benefit-icon"]}
              />
              {item.text}
            </li>
          ))}
        </ul>
        <Button
          className={styles["profile-login-btn"]}
          onClick={() => {
            onLoginClick();
            onClose();
          }}
        >
          Увійти за номером телефону (демо)
        </Button>
      </div>
    </div>
  );
};
export default ProfilePopover;
