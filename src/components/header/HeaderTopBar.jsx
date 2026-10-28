import Container from "../layout/Container";
import clsx from "clsx";
import styles from "./header.module.css";

const HeaderTopBar = () => {
  return (
    <div className={styles["header-topbar"]}>
      <Container>
        <div className={clsx("flex-center", styles["header-topbar-inner"])}>
          <div className={styles["header-topbar-left"]}>
            Знайомтеся з Urbanfood і спробуйте <a href="/#delivery-payment">демо-знижку</a> 10%
          </div>
          <a href="/#delivery-payment" className={styles["header-topbar-cta"]}>
            Отримати знижку
          </a>
        </div>
      </Container>
    </div>
  );
};

export default HeaderTopBar;
