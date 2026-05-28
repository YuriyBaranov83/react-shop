import { useCallback, useEffect, useRef, useState } from "react";

import Container from "@/components/layout/Container";
import VacanciesHero from "./components/VacanciesHero/VacanciesHero";
import VacanciesIntro from "./components/VacanciesIntro/VacanciesIntro";
import VacanciesList from "./components/VacanciesList/VacanciesList";
import VacancyModal from "./components/VacancyModal/VacancyModal";
import { vacanciesData } from "./data/vacanciesData";
import styles from "./VacanciesPage.module.css";

const VacanciesPage = () => {
  const [activeVacancyId, setActiveVacancyId] = useState(null);
  const openerButtonRef = useRef(null);

  const activeVacancy = vacanciesData.find((vacancy) => vacancy.id === activeVacancyId) || null;

  const handleOpenVacancy = useCallback((vacancy, openerButton) => {
    openerButtonRef.current = openerButton;
    setActiveVacancyId(vacancy.id);
  }, []);

  const handleCloseVacancy = useCallback(() => {
    setActiveVacancyId(null);
  }, []);

  useEffect(() => {
    if (activeVacancyId !== null) {
      return;
    }

    openerButtonRef.current?.focus?.();
  }, [activeVacancyId]);

  return (
    <section className={styles.section}>
      <Container>
        <VacanciesHero />
        <VacanciesList vacancies={vacanciesData} onOpenDetails={handleOpenVacancy} />
        <VacanciesIntro />
      </Container>

      <VacancyModal vacancy={activeVacancy} onClose={handleCloseVacancy} />
    </section>
  );
};

export default VacanciesPage;
