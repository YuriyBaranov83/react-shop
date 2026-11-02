import { Link } from "react-router-dom";
import Brand from "@/components/ui/Brand/Brand";
import Button from "@/components/ui/Button/Button";
import { editorialPhotography } from "@/data/marketPhotography";
import styles from "./NotFoundPage.module.css";
const NotFoundPage = () => (
  <main id="main-content" className={styles["not-found-page"]} tabIndex={-1}>
    <Link to="/" aria-label="Urbanfood — на головну" className={styles.brand}>
      <Brand />
    </Link>
    <section
      className={styles["not-found-card"]}
      aria-labelledby="not-found-title"
    >
      <div className={styles.copy}>
        <p className={styles["not-found-label"]}>
          Здається, ми трохи заблукали
        </p>
        <p className={styles["not-found-code"]} aria-hidden="true">
          404<span>✳</span>
        </p>
        <h1 id="not-found-title">
          Тут поки нічого
          <br />
          не виросло.
        </h1>
        <p className={styles["not-found-description"]}>
          Цієї сторінки не існує. Та на головній ще багато свіжого й смачного —
          повернімося до покупок.
        </p>
        <Button to="/">
          На головну <span aria-hidden="true">↗</span>
        </Button>
      </div>
      <div className={styles.photo}>
        <img
          src={editorialPhotography.hero}
          alt="Кошик зі свіжими овочами"
          width="1600"
          height="1067"
          decoding="async"
        />
      </div>
    </section>
  </main>
);
export default NotFoundPage;
