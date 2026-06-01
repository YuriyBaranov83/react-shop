import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import AirDatepicker from "air-datepicker";
import localeUk from "air-datepicker/locale/uk";
import "air-datepicker/air-datepicker.css";
import RoundCheckbox from "@/components/ui/RoundCheckbox";
import styles from "./VacancyApplyForm.module.css";

const countryOptions = ["Україна", "Польща", "Чехія", "Литва"];

const VacancyApplyForm = ({
  className,
  submitLabel = "Відгукнутися",
  onSubmitStub,
}) => {
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const formId = useId();
  const checkboxId = `${formId}-policy`;
  const birthdayInputRef = useRef(null);

  useEffect(() => {
    if (!birthdayInputRef.current) {
      return undefined;
    }

    const picker = new AirDatepicker(birthdayInputRef.current, {
      locale: localeUk,
      autoClose: true,
      isMobile: window.matchMedia("(max-width: 760px)").matches,
      dateFormat: "dd.MM.yyyy",
      maxDate: new Date(),
      minDate: new Date(1940, 0, 1),
      navTitles: {
        days: "MMMM yyyy",
      },
    });

    return () => {
      picker.destroy();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitStub?.();
  };

  return (
    <form className={clsx(styles.form, className)} onSubmit={handleSubmit}>
      <input type="text" name="fullName" placeholder="Ф.І.О." autoComplete="name" />
      <input type="tel" name="phone" placeholder="Телефон" autoComplete="tel" />
      <label className={styles["date-wrap"]}>
        <span className={styles["visually-hidden"]}>Дата народження</span>
        <input
          ref={birthdayInputRef}
          type="text"
          name="birthday"
          placeholder="Дата народження"
          className={styles["date-input"]}
          autoComplete="bday"
          readOnly
        />
      </label>

      <label className={styles["select-wrap"]}>
        <span className={styles["visually-hidden"]}>Країна</span>
        <select name="country" defaultValue="Україна">
          {countryOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor={checkboxId} className={styles.policy}>
        <RoundCheckbox
          id={checkboxId}
          name="policyAccepted"
          checked={isPolicyAccepted}
          onChange={(event) => setIsPolicyAccepted(event.target.checked)}
          className={styles["policy-checkbox"]}
          ariaLabel="Згода на обробку персональних даних"
        />
        <span>згоден на обробку персональних даних</span>
      </label>

      <button type="submit" className={styles.submit} disabled={!isPolicyAccepted}>
        {submitLabel}
      </button>
    </form>
  );
};

export default VacancyApplyForm;
