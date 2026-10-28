import clsx from "clsx";
import styles from "./FormStatus.module.css";

const FormStatus = ({ children, className }) => <p className={clsx(styles.status, className)} role="status">{children}</p>;

export default FormStatus;
