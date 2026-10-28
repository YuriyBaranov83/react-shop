import { useId, useState } from "react";
import clsx from "clsx";
import RoundCheckbox from "@/components/ui/RoundCheckbox";
import FormField from "@/components/ui/FormField/FormField";
import FormStatus from "@/components/ui/FormStatus/FormStatus";
import Button from "@/components/ui/Button/Button";
import styles from "./VacancyApplyForm.module.css";

const countryOptions = ["Україна", "Польща", "Чехія", "Литва"];
const VacancyApplyForm = ({ className }) => {
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formId = useId();
  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return (
    <form className={clsx(styles.form, className)} onChange={() => setIsSubmitted(false)}
      onSubmit={(event) => { event.preventDefault(); setIsSubmitted(true); }}>
      <p className={styles["demo-note"]}>Демо-форма. Використовуйте вигадані дані: заявку не буде надіслано.</p>
      <FormField id={`${formId}-name`} label="Ім'я та прізвище">
        <input id={`${formId}-name`} type="text" name="fullName" autoComplete="name" required maxLength={100} />
      </FormField>
      <FormField id={`${formId}-phone`} label="Телефон">
        <input id={`${formId}-phone`} type="tel" name="phone" autoComplete="tel" required
          pattern="([+]?380|0)[0-9]{9}" title="Введіть номер у форматі +380XXXXXXXXX або 0XXXXXXXXX" placeholder="+380XXXXXXXXX" />
      </FormField>
      <FormField id={`${formId}-birthday`} label="Дата народження (необов'язково)">
        <input id={`${formId}-birthday`} type="date" name="birthday" autoComplete="bday" min="1940-01-01" max={maxDate} />
      </FormField>
      <FormField id={`${formId}-country`} label="Країна">
        <select id={`${formId}-country`} name="country" defaultValue="Україна">
          {countryOptions.map((country) => <option key={country} value={country}>{country}</option>)}
        </select>
      </FormField>
      <label htmlFor={`${formId}-policy`} className={styles.policy}>
        <RoundCheckbox id={`${formId}-policy`} name="policyAccepted" checked={isPolicyAccepted}
          onChange={(event) => setIsPolicyAccepted(event.target.checked)} ariaLabel="Розумію, що це демонстраційна форма" />
        <span>Розумію, що це демонстраційна форма</span>
      </label>
      <Button type="submit" disabled={!isPolicyAccepted}>Перевірити заявку</Button>
      {isSubmitted && <FormStatus>Форму заповнено коректно. Це демонстрація: заявку не надіслано.</FormStatus>}
    </form>
  );
};
export default VacancyApplyForm;
