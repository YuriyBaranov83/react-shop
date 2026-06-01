import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
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

const getFocusableElements = (container) => {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
};

const AuthModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("start"); // "start" | "phone" | "otp"
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

  const dialogRef = useRef(null);
  const otpRefs = useRef([]);
  const lastActiveElementRef = useRef(null);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    lastActiveElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements(dialogRef.current);

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const isShiftPressed = event.shiftKey;

      if (isShiftPressed && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }

      if (!isShiftPressed && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      lastActiveElementRef.current?.focus?.();
    };
  }, [handleClose, isOpen]);

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

  const agreementsError =
    isPhoneStepTouched && (!isTermsAccepted || !isPolicyAccepted)
      ? "Підтвердіть обидві згоди, щоб продовжити."
      : "";

  const isPhoneStepReady = isPhoneValid && isTermsAccepted && isPolicyAccepted;

  const handleBackdropMouseDown = (event) => {
    if (!dialogRef.current) {
      return;
    }

    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

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
    <div className={styles["auth-backdrop"]} onMouseDown={handleBackdropMouseDown}>
      <div
        className={styles["auth-dialog"]}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
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
            <div id={titleId} className={styles["auth-title"]}>
              Вітаємо!
            </div>
            <p className={styles["auth-demo-note"]}>{DEMO_AUTH_MESSAGE}</p>

            <ul className={styles["auth-benefits"]}>
              <li className={styles["auth-benefit"]}>Отримуйте персональні пропозиції</li>
              <li className={styles["auth-benefit"]}>Зберігайте улюблені товари та адреси</li>
              <li className={styles["auth-benefit"]}>Відстежуйте бонуси та знижки</li>
            </ul>

            <button
              type="button"
              className={clsx("btn__primary", styles["auth-primary-btn"])}
              onClick={() => {
                setIsPhoneStepTouched(false);
                setStep("phone");
              }}
            >
              Увійти за номером телефону
            </button>
          </div>
        )}

        {step === "phone" && (
          <form className={styles["auth-step"]} onSubmit={handlePhoneSubmit} noValidate>
            <div id={titleId} className={styles["auth-title"]}>
              Введіть номер телефону
            </div>
            <p className={styles["auth-demo-note"]}>{DEMO_AUTH_MESSAGE}</p>

            <input
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

            {phoneError ? (
              <p
                id={`${checkboxIdBase}-phone-error`}
                className={styles["auth-error"]}
                role="alert"
              >
                {phoneError}
              </p>
            ) : null}

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

            {agreementsError ? (
              <p className={styles["auth-error"]} role="alert">
                {agreementsError}
              </p>
            ) : null}

            <button
              type="submit"
              className={clsx("btn__primary", styles["auth-primary-btn"])}
              disabled={!isPhoneStepReady}
            >
              Отримати код (демо)
            </button>
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

              handleClose();
            }}
          >
            <div id={titleId} className={styles["auth-title"]}>
              Введіть код
            </div>
            <p className={styles["auth-demo-note"]}>{DEMO_AUTH_MESSAGE}</p>
            <div className={styles["auth-subtitle"]}>
              Ми показуємо демо-код для номера <b>{formatPhoneForDisplay(phone)}</b>
            </div>

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
                  onChange={(event) => handleOtpChange(index, event.target.value)}
                  onKeyDown={(event) => handleOtpKeyDown(index, event)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  aria-label={`Цифра коду ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="submit"
              className={clsx("btn__primary", styles["auth-primary-btn"])}
              disabled={otpValue.length !== OTP_LENGTH}
            >
              Підтвердити у демо-режимі
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
