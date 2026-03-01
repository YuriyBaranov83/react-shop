import { ContactsPage, HomePage, NotFoundPage } from "@/pages";
import MainLayout from "@/components/layout/MainLayout";
import homeStyles from "@/pages/home/HomePage.module.css";
import contactsStyles from "@/pages/contacts/ContactsPage.module.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout mainClassName={homeStyles.homePageMain} mainId="home-page" />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route
        element={
          <MainLayout
            mainClassName={contactsStyles.contacts__main}
            mainId="contacts-page"
          />
        }
      >
        <Route path="/contacts" element={<ContactsPage />} />
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
