import clsx from "clsx";
import {
  MdLocalGroceryStore,
  MdLocalPizza,
  MdAcUnit,
  MdCategory,
  MdLocalFireDepartment,
  MdStorefront,
} from "react-icons/md";

import Container from "../layout/Container";
import styles from "./header.module.css";

const navItems = [
  { id: "supermarket", label: "Супермаркет", Icon: MdLocalGroceryStore },
  { id: "cooking", label: "Кулинария", Icon: MdLocalPizza },
  { id: "freeze", label: "Заморозка", Icon: MdAcUnit },
  { id: "other", label: "Другое", Icon: MdCategory },
  {
    id: "promo",
    label: "Акции",
    Icon: MdLocalFireDepartment,
    emphasized: true,
  },
  { id: "stores", label: "Магазины", Icon: MdStorefront },
];

const HeaderNav = () => {
  return (
    <nav className={styles.header__nav} aria-label="Навигация по категориям">
      <Container>
        <ul className={styles.header__nav_list}>
          {navItems.map((item) => (
            <li key={item.id} className={styles.header__nav_item}>
              <button
                type="button"
                className={clsx(
                  styles.header__nav_button,
                  item.emphasized && styles.header__nav_button_emphasized
                )}
              >
                <item.Icon aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
};

export default HeaderNav;
