import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children, mainClassName, mainId }) => {
  const layoutContent = children ?? <Outlet />;

  return (
    <>
      <Header />
      <main className={mainClassName} id={mainId}>
        {layoutContent}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
