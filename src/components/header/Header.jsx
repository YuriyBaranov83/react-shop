import styles from "./header.module.css";
import HeaderTopBar from "./HeaderTopBar";
import HeaderMain from "./HeaderMain";
import HeaderNav from "./HeaderNav";

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderTopBar />
      <HeaderMain />
      <HeaderNav />
    </header>
  );
};
export default Header;
