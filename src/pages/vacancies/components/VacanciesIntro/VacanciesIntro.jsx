import VacancyApplyForm from "../VacancyApplyForm/VacancyApplyForm";
import likeIcon from "@/assets/icons/vacancies/Like_perspective_matte.webp";
import styles from "./VacanciesIntro.module.css";

const VacanciesIntro = () => {
  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <h2>ХОЧЕТЕ СТАТИ ЧАСТИНОЮ НАШОЇ КОМАНДИ?</h2>
        <p>Спробуйте заповнити демонстраційну заявку.</p>
        <span className={styles.badge} aria-hidden="true">
          <img src={likeIcon} alt="" loading="lazy" decoding="async" />
        </span>
      </div>

      <VacancyApplyForm className={styles.form} />
    </section>
  );
};

export default VacanciesIntro;
