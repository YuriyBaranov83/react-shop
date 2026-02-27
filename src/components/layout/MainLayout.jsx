import Header from "../header/Header";
import Footer from "../footer/Footer";

const MainLayout = ({ children, mainClassName, mainId }) => {
  return (
    <>
      <Header />
      <main className={mainClassName} id={mainId}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
