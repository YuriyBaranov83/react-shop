import "swiper/css";
import "swiper/css/pagination";

import MainLayout from "@/components/layout/MainLayout";
import DealsSection from "./sections/DealsSection";
import HeroSection from "./sections/HeroSection";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <MainLayout mainClassName={styles.homePageMain} mainId="home-page">
      <HeroSection />
      <DealsSection />
    </MainLayout>
  );
};

export default HomePage;
