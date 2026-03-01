import { useState } from "react";
import Container from "../layout/Container";
import styles from "./footer.module.css";
import { footerClientLinks, footerClubLinks } from "@/data/footerData";
import RoundCheckbox from "@/components/ui/RoundCheckbox";
import { MdPhoneInTalk, MdLocationOn, MdPublic, MdMailOutline } from "react-icons/md";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa6";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FOOTER_EMAIL_INPUT_ID = "footer-subscribe-email";
const FOOTER_POLICY_CHECKBOX_ID = "footer-policy-checkbox";
const FOOTER_SUBSCRIBE_FORM_ID = "footer-subscribe-form";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [policyError, setPolicyError] = useState("");

  const validateEmail = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return "Вкажіть e-mail";
    if (!emailPattern.test(trimmedValue)) return "Введіть коректний e-mail";

    return "";
  };

  const handleEmailChange = (e) => {
    const nextEmail = e.target.value;
    setEmail(nextEmail);

    if (emailError) {
      setEmailError(validateEmail(nextEmail));
    }
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePolicyChange = (e) => {
    const checked = e.target.checked;
    setIsPolicyAccepted(checked);

    if (checked) {
      setPolicyError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextEmailError = validateEmail(email);
    const nextPolicyError = isPolicyAccepted
      ? ""
      : "Потрібна згода з політикою конфіденційності";

    setEmailError(nextEmailError);
    setPolicyError(nextPolicyError);

    if (nextEmailError || nextPolicyError) return;

    setEmail("");
    setIsPolicyAccepted(false);
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles["footer-top"]}>
          <div className={`${styles["footer-column"]} ${styles["footer-column-club"]}`}>
            <h3 className={styles["footer-title"]}>Urbanfood клуб</h3>
            <ul className={styles["footer-links"]}>
              {footerClubLinks.map((item) => (
                <li key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles["footer-column"]} ${styles["footer-column-client"]}`}>
            <h3 className={styles["footer-title"]}>Клієнтам</h3>
            <ul className={styles["footer-links"]}>
              {footerClientLinks.map((item) => (
                <li key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles["footer-column"]} ${styles["footer-column-phone"]}`}>
            <div className={styles["footer-phone-wrap"]}>
              <a className={styles["footer-phone-link"]} href="tel:+38000490999">
                <MdPhoneInTalk aria-hidden="true" />
                <span className={styles["footer-phone"]}>+38 (000) 49-09-99</span>
              </a>
            </div>
            <p className={styles["footer-work-time"]}>Щодня з 09:00 до 21:00</p>

            <ul className={styles["footer-contacts"]}>
              <li>
                <a href="#">
                  <MdLocationOn aria-hidden="true" />
                  <span>Адреси магазинів</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <MdPublic aria-hidden="true" />
                  <span>Стежте за нами</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <MdMailOutline aria-hidden="true" />
                  <span>Зворотний зв&apos;язок</span>
                </a>
              </li>
            </ul>
          </div>

          <div className={`${styles["footer-column"]} ${styles["footer-column-subscribe"]}`}>
            <h3 className={styles["footer-title"]}>
              Підпишіться на смачні та корисні новини
            </h3>

            <form
              id={FOOTER_SUBSCRIBE_FORM_ID}
              className={styles["footer-subscribe"]}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles["footer-subscribe-field"]}>
                <input
                  id={FOOTER_EMAIL_INPUT_ID}
                  name="subscribeEmail"
                  type="email"
                  placeholder="Ваш e-mail"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  aria-invalid={emailError ? "true" : "false"}
                  aria-describedby={emailError ? "footer-email-error" : undefined}
                />
                {emailError && (
                  <span
                    id="footer-email-error"
                    className={`${styles["footer-error"]} ${styles["footer-error-email"]}`}
                    role="alert"
                  >
                    {emailError}
                  </span>
                )}
              </div>

            </form>

            <div className={styles["footer-policy-wrap"]}>
              <label className={styles["footer-policy"]}>
                <RoundCheckbox
                  id={FOOTER_POLICY_CHECKBOX_ID}
                  name="privacyPolicyAccepted"
                  checked={isPolicyAccepted}
                  onChange={handlePolicyChange}
                  ariaLabel="Згода з політикою конфіденційності"
                />
                <span>Згоден з політикою конфіденційності</span>
              </label>

              {policyError && (
                <p
                  className={`${styles["footer-error"]} ${styles["footer-error-policy"]}`}
                  role="alert"
                >
                  {policyError}
                </p>
              )}
            </div>

            <button
              type="submit"
              form={FOOTER_SUBSCRIBE_FORM_ID}
              className={styles["footer-subscribe-submit"]}
            >
              Підписатися
            </button>
          </div>
        </div>

        <div className={styles["footer-bottom"]}>
          <p className={styles["footer-copy"]}>
            © {currentYear} Urbanfood клуб і онлайн - доставка товарів і продуктів
            додому
          </p>
          <p className={styles["footer-disclaimer"]}>Інформація на сайті не є публічною офертою</p>
          <div className={styles["footer-payment"]} aria-label="Способи оплати">
            <FaCcVisa title="VISA" aria-label="VISA" />
            <FaCcMastercard title="Mastercard" aria-label="Mastercard" />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
