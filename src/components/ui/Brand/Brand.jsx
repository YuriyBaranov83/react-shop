import clsx from "clsx";
import brandMark from "@/assets/icons/urbanfood-mark.svg";
import styles from "./Brand.module.css";
const Brand = ({ light = false }) => (
  <span className={clsx(styles.brand, light && styles.light)}>
    <img src={brandMark} width="44" height="44" alt="" aria-hidden="true" />
    <span className={styles.wordmark}>
      urban<span>food</span>
      <small>твій міський маркет</small>
    </span>
  </span>
);
export default Brand;
