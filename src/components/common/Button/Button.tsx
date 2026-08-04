import styles from "./Button.module.css";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  variant?: "default" | "race";
  type?: "button" | "submit";
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  text = "",
  variant = "default",
  type = "button",
  onClick = () => {},
  children,
  disabled = false,
  className = "",
}: ButtonProps): React.JSX.Element => {
  const buttonClass = [
    styles.button,
    variant === "race" && styles.race,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      type={type === "submit" ? "submit" : "button"}
    >
      {children ?? text}
    </button>
  );
};

export default Button;
