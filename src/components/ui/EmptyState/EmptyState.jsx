import Button from "@/components/ui/Button/Button";
import styles from "./EmptyState.module.css";

const EmptyState = ({ children, onReset, actionTo = "/catalog", actionLabel = "Перейти до каталогу" }) => (
  <div className={styles["empty-state"]}>
    <p>{children}</p>
    {onReset
      ? <Button variant="secondary" onClick={onReset}>{actionLabel}</Button>
      : <Button variant="secondary" to={actionTo}>{actionLabel}</Button>}
  </div>
);

export default EmptyState;
