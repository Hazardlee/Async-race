import CarForm from "./CarForm/CarForm";
import styles from "./GaragePanel.module.css";
import Button from "../../common/Button/Button";
import { useAppDispatch } from "../../../app/hooks";
import { generateCars } from "../../../features/Cars/thunk";

const GaragePanel = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  
  return (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <Button text="Race" variant="race" />
      <Button text="Reset" variant="race" />
    </div>
    <CarForm />
    <div>
      <Button text="Generate" variant="default" onClick={() => dispatch(generateCars())}/>
    </div>
  </div>
)};

export default GaragePanel;
