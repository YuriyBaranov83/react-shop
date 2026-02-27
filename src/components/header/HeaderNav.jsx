import clsx from "clsx";
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
  { id: "supermarket", label: "Супермаркет", Icon: MdLocalGroceryStore, href: "#supermarket" },
  { id: "culinary", label: "Кулінарія", Icon: MdLocalPizza, href: "#culinary" },
  { id: "frozen", label: "Заморозка", Icon: MdAcUnit, href: "#frozen" },
  { id: "other", label: "Інше", Icon: MdCategory, href: "#other" },
  {
    id: "promotions",
    label: "Акції",
    Icon: MdLocalFireDepartment,
    href: "#promotions",
    emphasized: true,
  },
  { id: "stores", label: "Магазини", Icon: MdStorefront, href: "#delivery-payment" },
];

const HeaderNav = () => {
  return (
    <nav className={styles.header__nav} aria-label="Навігація за категоріями">
      <Container>
        <ul className={styles.header__nav_list}>
          {navItems.map((item) => (
            <li key={item.id} className={styles.header__nav_item}>
              <a
                href={item.href}
                className={clsx(
                  styles.header__nav_button,
                  item.emphasized && styles.header__nav_button_emphasized
                )}
              >
                <item.Icon aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
};

export default HeaderNav;
