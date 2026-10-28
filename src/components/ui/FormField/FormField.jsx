import styles from "./FormField.module.css";

const FormField = ({ id, label, children }) => (
  <div className={styles.field}>
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
);

export default FormField;
