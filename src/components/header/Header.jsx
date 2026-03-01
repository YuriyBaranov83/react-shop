import styles from "./header.module.css";
import HeaderTopBar from "./HeaderTopBar";
import HeaderMain from "./HeaderMain";
import HeaderNav from "./HeaderNav";
import ScrollToTopButton from "../ui/ScrollToTopButton";

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderTopBar />
      <HeaderMain />
      <HeaderNav />
      <ScrollToTopButton />
    </header>
  );
};
export default Header;
