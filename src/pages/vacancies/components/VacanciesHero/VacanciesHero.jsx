import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import styles from "./VacanciesHero.module.css";

const VacanciesHero = () => {
  return (
    <header className={styles.hero}>
      <Breadcrumbs items={[{ label: "Головна", to: "/" }, { label: "Вакансії" }]} />

      <h1>ВАКАНСІЇ</h1>
    </header>
  );
};

export default VacanciesHero;
