import { Link } from "react-router-dom";
import styles from "./VacanciesHero.module.css";

const VacanciesHero = () => {
  return (
    <header className={styles.hero}>
      <nav className={styles.breadcrumbs} aria-label="Хлібні крихти">
        <Link to="/">Головна</Link>
        <span aria-hidden="true">/</span>
        <span>Вакансії</span>
      </nav>

      <h1>ВАКАНСІЇ</h1>
    </header>
  );
};

export default VacanciesHero;
