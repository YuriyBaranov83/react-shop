import { Link } from "react-router-dom";
import Brand from "@/components/ui/Brand/Brand";
import { shopInfo } from "@/data/shopInfoData";
import FormStatus from "@/components/ui/FormStatus/FormStatus";
import { useState } from "react";
import Container from "../layout/Container";
import styles from "./footer.module.css";
import { footerClientLinks, footerClubLinks } from "@/data/footerData";
import RoundCheckbox from "@/components/ui/RoundCheckbox";
import { MdPhoneInTalk, MdLocationOn, MdMailOutline } from "react-icons/md";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa6";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FOOTER_EMAIL_INPUT_ID = "footer-subscribe-email";
const FOOTER_POLICY_CHECKBOX_ID = "footer-policy-checkbox";
const FOOTER_SUBSCRIBE_FORM_ID = "footer-subscribe-form";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [isSubmitted, setIsSubmitted] = useState(false);
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
    setIsSubmitted(false);
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
    setIsSubmitted(false);
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

    if (nextEmailError || nextPolicyError) {
      e.currentTarget.elements
        .namedItem(nextEmailError ? "subscribeEmail" : "privacyPolicyAccepted")
        ?.focus();
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <section
          className={styles.newsletter}
          aria-labelledby="footer-newsletter-title"
        >
          <div className={styles["newsletter-copy"]}>
            <p className={styles["newsletter-eyebrow"]}>
              Залишаймося на зв’язку
            </p>
            <h2 id="footer-newsletter-title">Трохи смачного у вашу пошту</h2>
            <p>
              Ідеї до вечері, сезонні знахідки та маленькі приводи потішити
              себе.
            </p>
          </div>
          <form
            id={FOOTER_SUBSCRIBE_FORM_ID}
            className={styles["footer-subscribe"]}
            onSubmit={handleSubmit}
            aria-labelledby="footer-newsletter-title"
            aria-describedby="footer-subscribe-note"
            noValidate
          >
            <div className={styles["footer-subscribe-row"]}>
              <div className={styles["footer-subscribe-field"]}>
                <label
                  htmlFor={FOOTER_EMAIL_INPUT_ID}
                  className="visually-hidden"
                >
                  Ваш e-mail
                </label>
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
                  aria-describedby={
                    emailError ? "footer-email-error" : undefined
                  }
                />
              </div>
              <button
                type="submit"
                className={styles["footer-subscribe-submit"]}
              >
                Спробувати підписку <span aria-hidden="true">↗</span>
              </button>
            </div>
            {emailError && (
              <p
                id="footer-email-error"
                className={styles["footer-error"]}
                role="alert"
              >
                {emailError}
              </p>
            )}
            <div className={styles["footer-policy-wrap"]}>
              <label className={styles["footer-policy"]}>
                <RoundCheckbox
                  id={FOOTER_POLICY_CHECKBOX_ID}
                  name="privacyPolicyAccepted"
                  checked={isPolicyAccepted}
                  onChange={handlePolicyChange}
                  ariaLabel="Згода з політикою конфіденційності"
                  aria-invalid={policyError ? "true" : "false"}
                  aria-describedby={
                    policyError ? "footer-policy-error" : undefined
                  }
                />
                <span>Згоден з політикою конфіденційності</span>
              </label>
              {policyError && (
                <p
                  id="footer-policy-error"
                  className={styles["footer-error"]}
                  role="alert"
                >
                  {policyError}
                </p>
              )}
            </div>
            <p
              id="footer-subscribe-note"
              className={styles["footer-demo-note"]}
            >
              Демо-форма: дані не надсилаються, підписка не створюється.
            </p>
            {isSubmitted && (
              <FormStatus className={styles["footer-status"]}>
                Форму заповнено коректно. Це демонстрація: підписку не створено.
              </FormStatus>
            )}
          </form>
        </section>
        <div className={styles["footer-top"]}>
          <div
            className={`${styles["footer-column"]} ${styles["footer-column-club"]}`}
          >
            <Link to="/" aria-label="Urbanfood — на головну">
              <Brand light />
            </Link>
            <p>Хороші продукти. Хороший день.</p>
            <ul className={styles["footer-links"]}>
              {footerClubLinks.map((item) => (
                <li key={item.id}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`${styles["footer-column"]} ${styles["footer-column-client"]}`}
          >
            <h3 className={styles["footer-title"]}>Клієнтам</h3>
            <ul className={styles["footer-links"]}>
              {footerClientLinks.map((item) => (
                <li key={item.id}>
                  {item.href ? (
                    <Link to={item.href}>{item.label}</Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`${styles["footer-column"]} ${styles["footer-column-phone"]}`}
          >
            <div className={styles["footer-phone-wrap"]}>
              <Link className={styles["footer-phone-link"]} to="/contacts">
                <MdPhoneInTalk aria-hidden="true" />
                <span className={styles["footer-phone"]}>
                  Контакти магазину
                </span>
              </Link>
            </div>
            <p className={styles["footer-work-time"]}>
              {shopInfo.supportHours} (демо)
            </p>

            <ul className={styles["footer-contacts"]}>
              <li>
                <Link to="/contacts">
                  <MdLocationOn aria-hidden="true" />
                  <span>Адреси магазинів (демо)</span>
                </Link>
              </li>
              <li>
                <Link to="/contacts">
                  <MdMailOutline aria-hidden="true" />
                  <span>Зворотний зв&apos;язок</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles["footer-bottom"]}>
          <p className={styles["footer-copy"]}>
            © {currentYear} Urbanfood клуб і онлайн - доставка товарів і
            продуктів додому
          </p>
          <p className={styles["footer-disclaimer"]}>
            Інформація на сайті не є публічною офертою
          </p>
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
