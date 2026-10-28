import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ items }) => (
  <nav className={styles.breadcrumbs} aria-label="Хлібні крихти">
    {items.map((item, index) => (
      <Fragment key={item.to || item.label}>
        {index > 0 && <span aria-hidden="true">/</span>}
        {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
      </Fragment>
    ))}
  </nav>
);

export default Breadcrumbs;
