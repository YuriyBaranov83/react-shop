import styles from "./VacancyDetailsGroup.module.css";

const VacancyDetailsGroup = ({ title, items }) => {
  return (
    <section className={styles.group}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    </section>
  );
};

export default VacancyDetailsGroup;
