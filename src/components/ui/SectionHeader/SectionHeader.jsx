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
    <div className={clsx(styles.sectionHeader, className)}>
      <div className={styles.sectionHeader__left}>
        <h2>{title}</h2>
        {linkLabel ? <a href={linkHref}>{linkLabel}</a> : null}
      </div>

      {actions ? <div className={styles.sectionHeader__actions}>{actions}</div> : null}
    </div>
  );
};

export default SectionHeader;
