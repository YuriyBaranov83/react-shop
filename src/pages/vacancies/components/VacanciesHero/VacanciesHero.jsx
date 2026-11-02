import Breadcrumbs from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { editorialPhotography } from "@/data/marketPhotography";
import styles from "./VacanciesHero.module.css";
const VacanciesHero = () => (
  <header className={styles.hero}>
    <Breadcrumbs
      items={[{ label: "Головна", to: "/" }, { label: "Вакансії" }]}
    />
    <div className={styles.layout}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Команда Urbanfood</p>
        <h1>
          Хороший день
          <br />
          починається з людей.
        </h1>
        <p className={styles.intro}>
          Вакансії для тих, кому близькі смачна їжа, живе спілкування та турбота
          про інших.
        </p>
        <a href="#vacancies-list">
          Знайти свою роль <span aria-hidden="true">↓</span>
        </a>
        <p className={styles.demo}>
          Демонстраційні вакансії навчального проєкту.
        </p>
      </div>
      <div className={styles.photo}>
        <img
          src={editorialPhotography.careers}
          alt="Руки кухаря за приготуванням страви"
          width="1400"
          height="933"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  </header>
);
export default VacanciesHero;
