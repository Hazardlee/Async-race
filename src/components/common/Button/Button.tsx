import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "default" | "race";
  type?: "button" | "submit";
}

const Button = ({
  text,
  variant = "default",
  type = "button",
  onClick = () => {},
}: ButtonProps): React.JSX.Element => {
  const buttonClass =
    variant === "race" ? `${styles.button} ${styles.race}` : styles.button;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
    >
      {text}
    </button>
  );
};

export default Button;
