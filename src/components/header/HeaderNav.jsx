import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  MdAcUnit,
  MdCategory,
  MdLocalFireDepartment,
  MdLocalGroceryStore,
  MdLocalPizza,
  MdStorefront,
} from "react-icons/md";

import Container from "../layout/Container";
import styles from "./header.module.css";

const navItems = [
  {
    id: "supermarket",
    label: "Супермаркет",
    Icon: MdLocalGroceryStore,
    href: "/#supermarket",
  },
  {
    id: "culinary",
    label: "Кулінарія",
    Icon: MdLocalPizza,
    href: "/#culinary",
  },
  {
    id: "frozen",
    label: "Заморозка",
    Icon: MdAcUnit,
    href: "/#frozen",
  },
  {
    id: "other",
    label: "Інше",
    Icon: MdCategory,
    href: "/#other",
  },
  {
    id: "promotions",
    label: "Акції",
    Icon: MdLocalFireDepartment,
    href: "/#promotions",
    emphasized: true,
  },
  { id: "stores", label: "Магазини", Icon: MdStorefront, href: "/contacts" },
];

const HeaderNav = () => {
  return (
    <nav className={styles["header-nav"]} aria-label="Навігація за категоріями">
      <Container>
        <ul className={styles["header-nav-list"]}>
          {navItems.map((item) => {
            const linkClassName = clsx(
              styles["header-nav-button"],
              item.emphasized && styles["header-nav-button-emphasized"]
            );

            if (item.href.includes("#")) {
              return (
                <li key={item.id} className={styles["header-nav-item"]}>
                  <a href={item.href} className={linkClassName}>
                    <item.Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            }

            return (
              <li key={item.id} className={styles["header-nav-item"]}>
                <Link to={item.href} className={linkClassName}>
                  <item.Icon aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
};

export default HeaderNav;
