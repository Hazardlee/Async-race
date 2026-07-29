import styles from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  variant:
    | "delete"
    | "edit"
    | "start"
    | "stop"
    | "race"
    | "reset"
    | "create"
    | "update"
    | "generate";
}

const Button = ({ variant }: ButtonProps): React.ReactElement => (
  <>
    {variant === "delete" && <button className={styles.button}>Delete</button>}
    {variant === "edit" && <button className={styles.button}>Edit</button>}
    {variant === "start" && <button className={styles.button}>A</button>}
    {variant === "stop" && <button className={styles.button}>B</button>}
    {variant === "race" && (
      <button className={`${styles.button} ${styles.race}`}>Race</button>
    )}
    {variant === "reset" && (
      <button className={`${styles.button} ${styles.race}`}>Reset</button>
    )}
    {variant === "create" && <button className={styles.button}>Create</button>}
    {variant === "update" && <button className={styles.button}>Update</button>}
    {variant === "generate" && (
      <button className={styles.button}>Generate</button>
    )}
  </>
);
export default Button;
