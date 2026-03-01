import notFoundImage from "@/assets/images/404/404.webp";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <main className={styles.notFoundPage}>
      <section className={styles.notFoundCard} aria-labelledby="not-found-title">
        <p className={styles.notFoundLabel}>помилка</p>

        <div className={styles.notFoundCode} id="not-found-title">
          <span>4</span>

          <div className={styles.notFoundImageWrap} aria-hidden="true">
            <img src={notFoundImage} alt="" loading="lazy" decoding="async" />
          </div>

          <span>4</span>
        </div>

        <p className={styles.notFoundDescription}>
          Ой! Здається, щось пішло не так. Сторінка, яку ви запитуєте, не існує або
          адресу було введено неправильно.
        </p>

        <Link to="/" className={styles.notFoundHomeLink}>
          Перейти на головну
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
