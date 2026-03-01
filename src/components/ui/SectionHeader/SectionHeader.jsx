import clsx from "clsx";
import styles from "./SectionHeader.module.css";

const SectionHeader = ({
  title,
  linkLabel = "Дивитися все",
  linkHref = "#",
  actions = null,
  className,
}) => {
  return (
    <div className={clsx(styles["section-header"], className)}>
      <div className={styles["section-header-left"]}>
        <h2>{title}</h2>
        {linkLabel ? <a href={linkHref}>{linkLabel}</a> : null}
      </div>

      {actions ? <div className={styles["section-header-actions"]}>{actions}</div> : null}
    </div>
  );
};

export default SectionHeader;
