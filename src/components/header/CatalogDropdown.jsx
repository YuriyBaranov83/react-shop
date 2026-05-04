import { useMemo, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { catalogData } from "@/data/catalogData";
import styles from "./header.module.css";
import clsx from "clsx";

const CatalogDropdown = () => {
  const [activeId, setActiveId] = useState(catalogData[0]?.id);

  const active = useMemo(
    () => catalogData.find((x) => x.id === activeId),
    [activeId]
  );

  return (
    <div className={styles["catalog-menu"]}>
      <div className={clsx("flex-column", styles["catalog-left"])}>
        {catalogData.map((c) => (
          <button
            key={c.id}
            type="button"
            className={clsx(
              "flex-between",
              styles["cat-item"],
              c.id === activeId && styles["cat-item-active"]
            )}
            onMouseEnter={() => setActiveId(c.id)}
            onClick={() => setActiveId(c.id)}
          >
            {c.title}
            <span className={styles.arrow}>
              <MdKeyboardArrowRight />
            </span>
          </button>
        ))}
      </div>

      <div className={clsx("flex-column", styles["catalog-right"])}>
        <div className={styles["catalog-title"]}>{active?.title}</div>

        <ul className={clsx("flex-column", styles["sub-list"])}>
          {active?.items?.map((name) => (
            <li key={name}>
              <button type="button" className={styles["catalog-subitem"]} aria-disabled="true">
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatalogDropdown;
