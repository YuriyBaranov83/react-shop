import { Link } from "react-router-dom";
import Container from "../layout/Container";
import styles from "./header.module.css";
const HeaderTopBar = () => (
  <div className={styles["header-topbar"]}>
    <Container>
      <div className={styles["header-topbar-inner"]}>
        <p className={styles["header-topbar-left"]}>
          Трохи свіжості у вашому дні. <strong>Це Urbanfood.</strong>
        </p>
        <Link to="/#delivery-payment" className={styles["header-topbar-cta"]}>
          Доставка від 300 грн — безкоштовно <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </Container>
  </div>
);
export default HeaderTopBar;
