import VacancyCard from "../VacancyCard/VacancyCard";
import styles from "./VacanciesList.module.css";

const VacanciesList = ({ vacancies, onOpenDetails }) => {
  return (
    <section className={styles.section} aria-label="Список вакансій">
      <div className={styles.grid}>
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} onOpenDetails={onOpenDetails} />
        ))}
      </div>
    </section>
  );
};

export default VacanciesList;
