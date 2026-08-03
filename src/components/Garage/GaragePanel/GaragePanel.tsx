import CarForm from "./CarForm/CarForm";
import styles from "./GaragePanel.module.css";
import Button from "../../common/Button/Button";
import { useAppDispatch } from "../../../app/hooks";
import { generateCars } from "../../../features/Cars/thunk";
import { setRaceStatus } from "../../../features/Race/raceSlice";

const GaragePanel = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Button
          text="Race"
          variant="race"
          onClick={() => dispatch(setRaceStatus("started"))}
        />
        <Button
          text="Reset"
          variant="race"
          onClick={() => dispatch(setRaceStatus("stopped"))}
        />
      </div>
      <CarForm />
      <div>
        <Button
          text="Generate"
          variant="default"
          onClick={() => dispatch(generateCars())}
        />
      </div>
    </div>
  );
};

export default GaragePanel;
