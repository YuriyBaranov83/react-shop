import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./SectionHeader.module.css";

const SectionHeader = ({
  title,
  linkLabel = "Дивитися все",
  linkHref = null,
  actions = null,
  className,
}) => {
  const isRouteLink =
    typeof linkHref === "string" &&
    linkHref.startsWith("/") &&
    !linkHref.startsWith("/#");

  return (
    <div className={clsx(styles["section-header"], className)}>
      <div className={styles["section-header-left"]}>
        <h2>{title}</h2>
        {linkLabel && linkHref ? (
          isRouteLink ? (
            <Link to={linkHref}>{linkLabel}</Link>
          ) : (
            <a href={linkHref}>{linkLabel}</a>
          )
        ) : null}
      </div>

      {actions ? <div className={styles["section-header-actions"]}>{actions}</div> : null}
    </div>
  );
};

export default SectionHeader;
