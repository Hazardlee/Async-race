import styles from "./CarForm.module.css";
import Button from "../../../common/Button/Button";

const CarForm = (): React.ReactElement => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <input className={styles.inputText} type="text" />
      <input className={styles.inputColor} type="color" />
    </div>
    <Button text="Create" variant="default" />
  </div>
);

export default CarForm;
