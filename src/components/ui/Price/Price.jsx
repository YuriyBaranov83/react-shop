import clsx from "clsx";
import { formatMoney } from "@/utils/money";
import styles from "./Price.module.css";

const Price = ({ price, oldPrice, className }) => (
  <div className={clsx(styles.price, className)}>
    <strong>{formatMoney(price)}</strong>
    {oldPrice > price && <del><span className="visually-hidden">Попередня ціна: </span>{formatMoney(oldPrice)}</del>}
  </div>
);

export default Price;
