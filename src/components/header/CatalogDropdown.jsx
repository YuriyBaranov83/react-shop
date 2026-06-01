import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { catalogData } from "@/data/catalogData";
import styles from "./header.module.css";
import clsx from "clsx";

const CatalogDropdown = ({ onClose }) => {
  const [activeId, setActiveId] = useState(catalogData[0]?.id);

  const active = useMemo(
    () => catalogData.find((x) => x.id === activeId),
    [activeId]
  );

  return (
    <div className={styles["catalog-menu"]}>
      <div className={clsx("flex-column", styles["catalog-left"])}>
        {catalogData.map((c) => (
          <Link
            key={c.id}
            to={c.href || "#"}
            className={clsx(
              "flex-between",
              styles["cat-item"],
              c.id === activeId && styles["cat-item-active"]
            )}
            onMouseEnter={() => setActiveId(c.id)}
            onClick={() => {
              setActiveId(c.id);
              onClose?.();
            }}
          >
            {c.title}
            <span className={styles.arrow}>
              <MdKeyboardArrowRight />
            </span>
          </Link>
        ))}
      </div>

      <div className={clsx("flex-column", styles["catalog-right"])}>
        <div className={styles["catalog-title"]}>{active?.title}</div>

        <ul className={clsx("flex-column", styles["sub-list"])}>
          {active?.items?.map((item) => (
            <li key={item.id || item.label}>
              {item.href ? (
                <Link to={item.href} className={styles["catalog-subitem"]} onClick={onClose}>
                  {item.label}
                </Link>
              ) : (
                <button type="button" className={styles["catalog-subitem"]} aria-disabled="true">
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatalogDropdown;
