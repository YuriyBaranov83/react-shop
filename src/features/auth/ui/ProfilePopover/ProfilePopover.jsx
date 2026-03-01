import clsx from "clsx";
import styles from "./ProfilePopover.module.css";
import { discountIcon, deliveryIcon, starIcon } from "@assets/icons";

const ProfilePopover = ({
  isOpen,
  mode = "click",
  isAuthed = false,
  onLoginClick,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        styles["profile-popover"],
        mode === "hover" && styles["profile-popover-hover"]
      )}
      role="menu"
      aria-label="Профіль"
    >
      {!isAuthed ? (
        <div className={styles["profile-guest"]}>
          <div className={styles["profile-title"]}>Авторизуйтесь</div>

          <ul className={styles["profile-benefits"]}>
            <li
              className={clsx(
                styles["profile-benefit"],
                styles["profile-benefit-with-icon"]
              )}
            >
              <img
                src={discountIcon}
                alt=""
                aria-hidden="true"
                className={styles["profile-benefit-icon"]}
              />
              Купуйте товари зі знижками
            </li>
            <li
              className={clsx(
                styles["profile-benefit"],
                styles["profile-benefit-with-icon"]
              )}
            >
              <img
                src={deliveryIcon}
                alt=""
                aria-hidden="true"
                className={styles["profile-benefit-icon"]}
              />
              Керуйте доставками для себе та близьких
            </li>
            <li
              className={clsx(
                styles["profile-benefit"],
                styles["profile-benefit-with-icon"]
              )}
            >
              <img
                src={starIcon}
                alt=""
                aria-hidden="true"
                className={styles["profile-benefit-icon"]}
              />
              Відстежуйте покупки та акції
            </li>
          </ul>

          <button
            type="button"
            className={clsx("btn__primary", styles["profile-login-btn"])}
            onClick={() => {
              onLoginClick?.();
              onClose?.();
            }}
          >
            Увійти за номером телефону
          </button>
        </div>
      ) : (
        <div className={styles["profile-authed"]}>
          <div className={styles["profile-name"]}>Ваш профіль</div>

          <button type="button" className={styles["profile-menu-item"]}>
            Профіль
          </button>
          <button type="button" className={styles["profile-menu-item"]}>
            Налаштування
          </button>
          <button type="button" className={styles["profile-menu-item"]}>
            Бонуси <span className={styles["profile-badge"]}>17</span>
          </button>
          <button type="button" className={styles["profile-menu-item"]}>
            Знижка <span className={styles["profile-muted"]}>16 грн.</span>
          </button>

          <button
            type="button"
            className={clsx(styles["profile-menu-item"], styles["profile-logout"])}
          >
            Вийти
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePopover;

