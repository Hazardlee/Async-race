import CarForm from "./CarForm/CarForm";
import styles from "./GaragePanel.module.css";
import Button from "../../common/Button/Button";

const GaragePanel = (): React.ReactElement => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <Button text="Race" variant="race" />
      <Button text="Reset" variant="race" />
    </div>
    <CarForm />
    <div>
      <Button text="Generate" variant="default" />
    </div>
  </div>
);

export default GaragePanel;
