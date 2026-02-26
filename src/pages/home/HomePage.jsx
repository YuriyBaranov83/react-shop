import "swiper/css";
import "swiper/css/pagination";

import MainLayout from "@/components/layout/MainLayout";
import DealsSection from "./sections/DealsSection";
import HeroSection from "./sections/HeroSection";

const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <DealsSection />
    </MainLayout>
  );
};

export default HomePage;
