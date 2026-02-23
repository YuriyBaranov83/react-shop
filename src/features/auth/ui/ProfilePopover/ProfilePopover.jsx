import clsx from "clsx";
import styles from "./ProfilePopover.module.css";

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
        styles.profile__popover,
        mode === "hover" && styles
        
      )}
      role="menu"
      aria-label="Профіль"
    >
      {!isAuthed ? (
        <div className={styles.profile__guest}>
          <div className={styles.profile__title}>Авторизуйтесь</div>

          <ul className={styles.profile__benefits}>
            <li className={styles.profile__benefit}>
              Купуйте товари зі знижками
            </li>
            <li className={styles.profile__benefit}>
              Керуйте доставками для себе та близьких
            </li>
            <li className={styles.profile__benefit}>
              Відстежуйте покупки та акції
            </li>
          </ul>

          <button
            type="button"
            className={clsx("btn__primary", styles.profile__login_btn)}
            onClick={() => {
              onLoginClick?.();
              onClose?.();
            }}
          >
            Увійти за номером телефону
          </button>
        </div>
      ) : (
        <div className={styles.profile__authed}>
          <div className={styles.profile__name}>Ваш профіль</div>

          <button type="button" className={styles.profile__menu_item}>
            Профіль
          </button>
          <button type="button" className={styles.profile__menu_item}>
            Налаштування
          </button>
          <button type="button" className={styles.profile__menu_item}>
            Бонуси <span className={styles.profile__badge}>17</span>
          </button>
          <button type="button" className={styles.profile__menu_item}>
            Знижка <span className={styles.profile__muted}>16 грн.</span>
          </button>

          <button
            type="button"
            className={clsx(styles.profile__menu_item, styles.profile__logout)}
          >
            Вийти
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePopover;
