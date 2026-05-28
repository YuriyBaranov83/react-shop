import { getVacancyIcon } from "../vacancyIcons";
import styles from "./VacancyCard.module.css";

const splitSalaryLabel = (salaryLabel = "") => {
  const match = salaryLabel.match(/\s*[~≈]?\s*\d/);

  if (!match || typeof match.index !== "number") {
    return { prefix: salaryLabel, amount: "" };
  }

  const prefix = salaryLabel.slice(0, match.index).trim();
  const amount = salaryLabel.slice(match.index).trim();

  if (!prefix || !amount) {
    return { prefix: salaryLabel, amount: "" };
  }

  return { prefix, amount };
};

const VacancyCard = ({ vacancy, onOpenDetails }) => {
  const { src, FallbackIcon } = getVacancyIcon(vacancy.iconName);
  const { prefix, amount } = splitSalaryLabel(vacancy.salaryLabel);

  return (
    <article className={`${styles.card} ${styles[`card-${vacancy.cardTone}`] || ""}`.trim()}>
      <div className={styles.content}>
        <h2>{vacancy.title}</h2>
        <p className={styles.salaryLabel}>
          <span className={styles.salaryPrefix}>{prefix}</span>
          {amount ? <span className={styles.salaryAmount}>{amount}</span> : null}
        </p>

        <button
          type="button"
          className={styles.button}
          onClick={(event) => onOpenDetails(vacancy, event.currentTarget)}
        >
          {vacancy.buttonLabel}
        </button>
      </div>

      <div className={styles.iconWrap} aria-hidden="true">
        {src ? (
          <img src={src} alt="" loading="lazy" decoding="async" />
        ) : (
          <FallbackIcon />
        )}
      </div>
    </article>
  );
};

export default VacancyCard;
