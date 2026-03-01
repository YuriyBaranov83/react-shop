import Container from "../layout/Container";
import clsx from "clsx";
import styles from "./header.module.css";

const HeaderTopBar = () => {
  return (
    <div className={styles["header-topbar"]}>
      <Container>
        <div className={clsx("flex-center", styles["header-topbar-inner"])}>
          <div className={styles["header-topbar-left"]}>
            Харчуйтеся різноманітно і накопичуйте <a href="">знижку</a> до 10%
          </div>
          <button>Отримати знижку</button>
        </div>
      </Container>
    </div>
  );
};

export default HeaderTopBar;