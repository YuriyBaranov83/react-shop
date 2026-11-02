import VacancyApplyForm from "../VacancyApplyForm/VacancyApplyForm";
import styles from "./VacanciesIntro.module.css";
const VacanciesIntro = () => (
  <section className={styles.section}>
    <div className={styles.left}>
      <p className={styles.eyebrow}>Можливо, нам по дорозі</p>
      <h2>
        Не знайшли
        <br />
        свою роль?
      </h2>
      <p>
        Розкажіть трохи про себе. Спробуйте демонстраційну форму й познайомтеся
        з форматом заявки.
      </p>
      <span className={styles.note}>
        Тут починаються хороші знайомства <span aria-hidden="true">↗</span>
      </span>
    </div>
    <VacancyApplyForm className={styles.form} />
  </section>
);
export default VacanciesIntro;
