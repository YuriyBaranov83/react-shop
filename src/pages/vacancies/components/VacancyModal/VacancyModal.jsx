import { useRef } from "react";
import { IoMdClose } from "react-icons/io";

import useBodyScrollLock from "@/components/header/hooks/useBodyScrollLock";
import useEscapeKey from "@/components/header/hooks/useEscapeKey";
import VacancyApplyForm from "../VacancyApplyForm/VacancyApplyForm";
import VacancyDetailsGroup from "../VacancyDetailsGroup/VacancyDetailsGroup";
import { getVacancyIcon } from "../vacancyIcons";
import styles from "./VacancyModal.module.css";

const VacancyModal = ({ vacancy, onClose }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dialogTitleId = vacancy ? `vacancy-dialog-title-${vacancy.id}` : undefined;
  const dialogDescriptionId = vacancy
    ? `vacancy-dialog-description-${vacancy.id}`
    : undefined;

  useBodyScrollLock(Boolean(vacancy));
  useEscapeKey(onClose, { enabled: Boolean(vacancy) });

  if (!vacancy) {
    return null;
  }

  const { src, FallbackIcon } = getVacancyIcon(vacancy.iconName);

  const handleOverlayMouseDown = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    onClose();
  };

  const handleFormSubmitStub = () => {};

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayMouseDown}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescriptionId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.close}
          aria-label="Закрити вікно вакансії"
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        <div className={styles.body}>
          <div className={styles.content}>
            <header className={styles.head}>
              <div className={styles["icon-wrap"]} aria-hidden="true">
                {src ? <img src={src} alt="" loading="lazy" decoding="async" /> : <FallbackIcon />}
              </div>

              <div>
                <h2 id={dialogTitleId}>{vacancy.title}</h2>
                <p id={dialogDescriptionId}>{vacancy.salaryLabel}</p>
                <p>{vacancy.location} • {vacancy.employmentType}</p>
              </div>
            </header>

            <VacancyDetailsGroup title="Чим доведеться займатися?" items={vacancy.responsibilities} />
            <VacancyDetailsGroup title="Вашими перевагами буде" items={vacancy.requirements} />
            <VacancyDetailsGroup title="Ми гарантуємо" items={vacancy.conditions} />
          </div>

          <aside className={styles["form-wrap"]}>
            <VacancyApplyForm submitLabel="Відгукнутися" onSubmitStub={handleFormSubmitStub} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default VacancyModal;
