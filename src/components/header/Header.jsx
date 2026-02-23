import styles from "./header.module.css";
import HeaderTopBar from "./HeaderTopBar";
import HeaderMain from "./HeaderMain";

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderTopBar />
      <HeaderMain />
    </header>
  );
};
export default Header;
