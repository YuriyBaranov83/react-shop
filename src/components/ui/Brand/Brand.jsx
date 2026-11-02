import clsx from "clsx";
import styles from "./Brand.module.css";
const Brand = ({ light = false }) => (
  <span className={clsx(styles.brand, light && styles.light)}>
    <svg viewBox="0 0 40 44" width="36" height="40" aria-hidden="true">
      <circle cx="20" cy="25" r="18" fill="currentColor" />
      <g
        transform="rotate(-13 20 22)"
        fill="none"
        stroke="#ed7b37"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M10 10 27 4l2 8" />
        <rect x="8" y="12" width="25" height="28" rx="2.5" fill="#fffdf4" />
        <path d="M14 25h13M16 24a4.5 4.5 0 0 1 9 0M20.5 19v-1M14 30h7M14 34h13" />
      </g>
    </svg>
    <span className={styles.wordmark}>
      urban<span>food</span>
      <small>твій міський маркет</small>
    </span>
  </span>
);
export default Brand;
