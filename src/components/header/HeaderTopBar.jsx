import Container from "../layout/Container";
import clsx from "clsx";
import styles from "./header.module.css";

const HeaderTopBar = () => {
  return (
    <div className={styles.header__topbar}>
      <Container>
        <div className={clsx("flex-center", styles.header__topbar_inner)}>
          <div className={styles.header__topbar_left}>
            Харчуйтеся різноманітно і накопичуйте <a href="">знижку</a> до 10%
          </div>
          <button>Отримати знижку</button>
        </div>
      </Container>
    </div>
  );
};

export default HeaderTopBar;