import { IoMdClose } from "react-icons/io";
import Modal from "@/components/ui/Modal/Modal";
import VacancyApplyForm from "../VacancyApplyForm/VacancyApplyForm";
import VacancyDetailsGroup from "../VacancyDetailsGroup/VacancyDetailsGroup";
import { getVacancyIcon } from "../vacancyIcons";
import styles from "./VacancyModal.module.css";

const VacancyModal = ({ vacancy, onClose }) => {
  if (!vacancy) return null;
  const titleId = `vacancy-dialog-title-${vacancy.id}`;
  const descriptionId = `vacancy-dialog-description-${vacancy.id}`;
  const { src, FallbackIcon } = getVacancyIcon(vacancy.iconName);
  return (
    <Modal onClose={onClose} labelledBy={titleId} describedBy={descriptionId} overlayClassName={styles.overlay} className={styles.dialog}>
      <button type="button" className={styles.close} aria-label="Закрити вікно вакансії" onClick={onClose}>
        <IoMdClose aria-hidden="true" />
      </button>
      <div className={styles.body}>
        <div className={styles.content}>
          <header className={styles.head}>
            <div className={styles["icon-wrap"]} aria-hidden="true">
              {src ? <img src={src} alt="" width="96" height="96" decoding="async" /> : <FallbackIcon />}
            </div>
            <div>
              <h2 id={titleId}>{vacancy.title}</h2>
              <p id={descriptionId}>{vacancy.salaryLabel}</p>
              <p>{vacancy.location} • {vacancy.employmentType}</p>
            </div>
          </header>
          <VacancyDetailsGroup title="Чим доведеться займатися?" items={vacancy.responsibilities} />
          <VacancyDetailsGroup title="Вашими перевагами буде" items={vacancy.requirements} />
          <VacancyDetailsGroup title="Ми гарантуємо" items={vacancy.conditions} />
        </div>
        <aside className={styles["form-wrap"]}><VacancyApplyForm /></aside>
      </div>
    </Modal>
  );
};
export default VacancyModal;
