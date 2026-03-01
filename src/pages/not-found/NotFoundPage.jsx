import notFoundImage from "@/assets/images/404/404.webp";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <main className={styles["not-found-page"]}>
      <section className={styles["not-found-card"]} aria-labelledby="not-found-title">
        <p className={styles["not-found-label"]}>помилка</p>

        <div className={styles["not-found-code"]} id="not-found-title">
          <span>4</span>

          <div className={styles["not-found-image-wrap"]} aria-hidden="true">
            <img src={notFoundImage} alt="" loading="lazy" decoding="async" />
          </div>

          <span>4</span>
        </div>

        <p className={styles["not-found-description"]}>
          Ой! Здається, щось пішло не так. Сторінка, яку ви запитуєте, не існує або
          адресу було введено неправильно.
        </p>

        <Link to="/" className={styles["not-found-home-link"]}>
          Перейти на головну
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
