import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./Button.module.css";

const Button = ({ to, variant = "primary", className, children, ...props }) => {
  const classes = clsx(styles.button, styles[variant], className);
  return to
    ? <Link to={to} className={classes} {...props}>{children}</Link>
    : <button type="button" className={classes} {...props}>{children}</button>;
};

export default Button;
