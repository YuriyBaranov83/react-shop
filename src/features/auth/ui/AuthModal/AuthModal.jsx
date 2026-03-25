import { useEffect, useMemo, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import styles from "./AuthModal.module.css";

const OTP_LENGTH = 4;

const AuthModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("start"); // "start" | "phone" | "otp"
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(() =>
    Array.from({ length: OTP_LENGTH }, () => "")
  );

  const dialogRef = useRef(null);
  const otpRefs = useRef([]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && step === "otp") {
      otpRefs.current?.[0]?.focus?.();
    }
  }, [isOpen, step]);

  const otpValue = useMemo(() => otp.join(""), [otp]);

  const handleBackdropMouseDown = (e) => {
    if (!dialogRef.current) return;
    if (e.target === e.currentTarget) onClose?.();
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

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        setOtp((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
        return;
      }
      if (index > 0) otpRefs.current?.[index - 1]?.focus?.();
    }

    if (e.key === "ArrowLeft" && index > 0)
      otpRefs.current?.[index - 1]?.focus?.();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1)
      otpRefs.current?.[index + 1]?.focus?.();
  };

  const handleOtpPaste = (e) => {
    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!text) return;

    e.preventDefault();
    const next = Array.from({ length: OTP_LENGTH }, (_, i) => text[i] ?? "");
    setOtp(next);

    const lastIndex = Math.min(text.length, OTP_LENGTH) - 1;
    otpRefs.current?.[lastIndex]?.focus?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles["auth-backdrop"]}
      onMouseDown={handleBackdropMouseDown}
    >
      <div
        className={styles["auth-dialog"]}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={styles["auth-close"]}
          onClick={onClose}
          aria-label="Закрити"
        >
          <IoMdClose />
        </button>

        {step === "start" && (
          <div className={styles["auth-step"]}>
            <div className={styles["auth-title"]}>Вітаємо!</div>

            <ul className={styles["auth-benefits"]}>
              <li className={styles["auth-benefit"]}>
                Отримуйте персональні пропозиції
              </li>
              <li className={styles["auth-benefit"]}>
                Зберігайте улюблені товари та адреси
              </li>
              <li className={styles["auth-benefit"]}>
                Відстежуйте бонуси та знижки
              </li>
            </ul>

            <button
              type="button"
              className={clsx("btn__primary", styles["auth-primary-btn"])}
              onClick={() => setStep("phone")}
            >
              Увійти за номером телефону
            </button>
          </div>
        )}

        {step === "phone" && (
          <div className={styles["auth-step"]}>
            <div className={styles["auth-title"]}>Введіть номер телефону</div>

            <input
              className={styles["auth-input"]}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+38 (___) ___-__-__"
              inputMode="tel"
              autoFocus
            />

            <label className={styles["auth-check"]}>
              <input type="checkbox" /> Я погоджуюсь з умовами користування
            </label>

            <label className={styles["auth-check"]}>
              <input type="checkbox" /> Я даю згоду на обробку персональних даних
            </label>

            <button
              type="button"
              className={clsx("btn__primary", styles["auth-primary-btn"])}
              onClick={() => setStep("otp")}
            >
              Отримати код у SMS
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className={styles["auth-step"]}>
            <div className={styles["auth-title"]}>Введіть код</div>
            <div className={styles["auth-subtitle"]}>
              Ми надіслали код на номер <b>{phone || "+38 ..."}</b>
            </div>

            <div className={styles["auth-otp"]} onPaste={handleOtpPaste}>
              {otp.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  className={styles["auth-otp-input"]}
                  value={val}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <button
              type="button"
              className={clsx("btn__primary", styles["auth-primary-btn"])}
              disabled={otpValue.length !== OTP_LENGTH}
              onClick={() => {
                onClose?.();
              }}
            >
              Підтвердити
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
