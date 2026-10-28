import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import RoundCheckbox from "@/components/ui/RoundCheckbox";
import styles from "./AuthModal.module.css";

const OTP_LENGTH = 4;
const DEMO_AUTH_MESSAGE = "Авторизація працює в демо-режимі. SMS-код не надсилається.";

const normalizePhoneDigits = (value = "") => value.replace(/\D/g, "");

const isValidPhoneNumber = (value = "") => {
  const digits = normalizePhoneDigits(value);

  return (
    (digits.length === 12 && digits.startsWith("380")) ||
    (digits.length === 10 && digits.startsWith("0"))
  );
};

const formatPhoneForDisplay = (value = "") => {
  const digits = normalizePhoneDigits(value);

  if (digits.length === 10 && digits.startsWith("0")) {
    return `+38${digits}`;
  }

  if (digits.length === 12 && digits.startsWith("380")) {
    return `+${digits}`;
  }

  return value.trim() || "+38 ...";
};

const AuthModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("start"); // "start" | "phone" | "otp"
  const [otpError, setOtpError] = useState("");
  const [phone, setPhone] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [isPhoneStepTouched, setIsPhoneStepTouched] = useState(false);
  const [otp, setOtp] = useState(() =>
    Array.from({ length: OTP_LENGTH }, () => "")
  );

  const checkboxIdBase = useId();
  const termsCheckboxId = `${checkboxIdBase}-terms`;
  const policyCheckboxId = `${checkboxIdBase}-policy`;
  const otpFieldIds = useMemo(
    () =>
      Array.from(
        { length: OTP_LENGTH },
        (_, index) => `${checkboxIdBase}-otp-${index + 1}`
      ),
    [checkboxIdBase]
  );
  const titleId = `${checkboxIdBase}-title-${step}`;

  const otpRefs = useRef([]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (isOpen && step === "otp") {
      otpRefs.current?.[0]?.focus?.();
    }
  }, [isOpen, step]);

  const otpValue = useMemo(() => otp.join(""), [otp]);
  const isPhoneValid = useMemo(() => isValidPhoneNumber(phone), [phone]);

  const phoneError =
    isPhoneStepTouched && !isPhoneValid
      ? "Введіть коректний номер телефону у форматі +380XXXXXXXXX."
      : "";

  const isPhoneStepReady = isPhoneValid && isTermsAccepted && isPolicyAccepted;

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current?.[index + 1]?.focus?.();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      if (otp[index]) {
        setOtp((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
        return;
      }

      if (index > 0) {
        otpRefs.current?.[index - 1]?.focus?.();
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      otpRefs.current?.[index - 1]?.focus?.();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      otpRefs.current?.[index + 1]?.focus?.();
    }
  };

  const handleOtpPaste = (event) => {
    const text = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!text) {
      return;
    }

    event.preventDefault();

    const next = Array.from({ length: OTP_LENGTH }, (_, index) => text[index] ?? "");
    setOtp(next);

    const lastIndex = Math.min(text.length, OTP_LENGTH) - 1;
    otpRefs.current?.[lastIndex]?.focus?.();
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    setIsPhoneStepTouched(true);

    if (!isPhoneStepReady) {
      return;
    }

    setOtp(Array.from({ length: OTP_LENGTH }, () => ""));
    setStep("otp");
  };

  const handlePhoneInputBlur = () => {
    setIsPhoneStepTouched(true);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal onClose={handleClose} labelledBy={titleId}
      overlayClassName={styles["auth-backdrop"]} className={styles["auth-dialog"]}>
        <button
          type="button"
          className={styles["auth-close"]}
          onClick={handleClose}
          aria-label="Закрити"
        >
          <IoMdClose aria-hidden="true" />
        </button>

        {step === "start" && (
          <div className={styles["auth-step"]}>
            <h2 id={titleId} className={styles["auth-title"]}>
              Вітаємо!
            </h2>
            <p className={styles["auth-demo-note"]}>{DEMO_AUTH_MESSAGE}</p>

            <ul className={styles["auth-benefits"]}>
              <li className={styles["auth-benefit"]}>Переглядайте каталог і пропозиції</li>
              <li className={styles["auth-benefit"]}>Зберігайте товари в обраному</li>
              <li className={styles["auth-benefit"]}>Знайомтеся з умовами доставки</li>
            </ul>

            <Button
              type="button"
              className={styles["auth-primary-btn"]}
              onClick={() => {
                setIsPhoneStepTouched(false);
                setStep("phone");
              }}
            >
              Увійти за номером телефону
            </Button>
          </div>
        )}

        {step === "phone" && (
          <form className={styles["auth-step"]} onSubmit={handlePhoneSubmit} noValidate>
            <h2 id={titleId} className={styles["auth-title"]}>
              Введіть номер телефону
            </h2>
            <p className={styles["auth-demo-note"]}>{DEMO_AUTH_MESSAGE}</p>

            <label htmlFor={`${checkboxIdBase}-phone`}>Номер телефону</label>
            <input
              id={`${checkboxIdBase}-phone`}
              type="tel"
              autoComplete="tel"
              className={styles["auth-input"]}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+38 (___) ___-__-__"
              inputMode="tel"
              autoFocus
              onBlur={handlePhoneInputBlur}
              aria-invalid={Boolean(phoneError)}
              aria-describedby={phoneError ? `${checkboxIdBase}-phone-error` : undefined}
            />

              <p
                id={`${checkboxIdBase}-phone-error`}
                className={styles["auth-error"]}
                aria-live="polite"
              >
                {phoneError || "\u00a0"}
              </p>

            <label className={styles["auth-check"]} htmlFor={termsCheckboxId}>
              <RoundCheckbox
                id={termsCheckboxId}
                name="authTermsAccepted"
                checked={isTermsAccepted}
                onChange={(event) => setIsTermsAccepted(event.target.checked)}
                className={styles["auth-check-control"]}
                ariaLabel="Я погоджуюсь з умовами користування"
              />
              <span>Я погоджуюсь з умовами користування</span>
            </label>

            <label className={styles["auth-check"]} htmlFor={policyCheckboxId}>
              <RoundCheckbox
                id={policyCheckboxId}
                name="authPolicyAccepted"
                checked={isPolicyAccepted}
                onChange={(event) => setIsPolicyAccepted(event.target.checked)}
                className={styles["auth-check-control"]}
                ariaLabel="Я даю згоду на обробку персональних даних"
              />
              <span>Я даю згоду на обробку персональних даних</span>
            </label>

            <p id={`${checkboxIdBase}-agreements-hint`} className={styles["auth-demo-note"]}>
              Позначте обидва пункти, щоб продовжити демонстрацію.
            </p>

            <Button
              type="submit"
              className={styles["auth-primary-btn"]}
              disabled={!isPhoneStepReady}
              aria-describedby={`${checkboxIdBase}-agreements-hint`}
            >
              Отримати код (демо)
            </Button>
          </form>
        )}

        {step === "otp" && (
          <form
            className={styles["auth-step"]}
            onSubmit={(event) => {
              event.preventDefault();

              if (otpValue.length !== OTP_LENGTH) {
                return;
              }

              if (otpValue !== "1234") {
                setOtpError("Введіть демо-код 1234.");
                return;
              }
              setStep("done");
            }}
          >
            <h2 id={titleId} className={styles["auth-title"]}>
              Введіть код
            </h2>
            <p className={styles["auth-demo-note"]}>{DEMO_AUTH_MESSAGE}</p>
            <div className={styles["auth-subtitle"]}>
              Демо-код: <b>1234</b>. Номер: <b>{formatPhoneForDisplay(phone)}</b>
            </div>

            {otpError && <p className={styles["auth-error"]} role="alert">{otpError}</p>}
            <div className={styles["auth-otp"]} onPaste={handleOtpPaste}>
              {otpFieldIds.map((fieldId, index) => (
                <input
                  key={fieldId}
                  id={fieldId}
                  ref={(element) => {
                    otpRefs.current[index] = element;
                  }}
                  className={styles["auth-otp-input"]}
                  value={otp[index]}
                  onChange={(event) => { setOtpError(""); handleOtpChange(index, event.target.value); }}
                  onKeyDown={(event) => handleOtpKeyDown(index, event)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  aria-label={`Цифра коду ${index + 1}`}
                />
              ))}
            </div>

            <Button
              type="submit"
              className={styles["auth-primary-btn"]}
              disabled={otpValue.length !== OTP_LENGTH}
            >
              Підтвердити у демо-режимі
            </Button>
          </form>
        )}
        {step === "done" && <div className={styles["auth-step"]}>
          <h2 id={titleId} className={styles["auth-title"]}>Демонстрацію завершено</h2>
          <p role="status">Код перевірено локально. Обліковий запис не створено, дані не надсилаються та не зберігаються.</p>
          <Button autoFocus onClick={handleClose}>Повернутися до покупок</Button>
        </div>}
    </Modal>
  );
};

export default AuthModal;
