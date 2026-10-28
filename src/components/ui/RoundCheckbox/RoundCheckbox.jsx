import clsx from "clsx";
import styles from "./RoundCheckbox.module.css";

const RoundCheckbox = ({
  checked,
  onChange,
  id,
  name,
  required = false,
  disabled = false,
  ariaLabel,
  className,
}) => {
  return (
    <span className={clsx(styles.root, className)}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-label={ariaLabel}
      />
      <span className={styles.control} aria-hidden="true">
        <span className={styles.dot} />
      </span>
    </span>
  );
};

export default RoundCheckbox;
