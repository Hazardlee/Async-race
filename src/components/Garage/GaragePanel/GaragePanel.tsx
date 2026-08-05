import CarForm from "./CarForm/CarForm";
import styles from "./GaragePanel.module.css";
import { useAppDispatch } from "../../../app/hooks";
import { generateCars } from "../../../features/Cars/thunk";
import { setRaceStatus } from "../../../features/Race/raceSlice";
import useRaceStatus from "../../../hooks/useRaceStatus";
import Button from "../../common/Button/Button";

const GaragePanel = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { isRacing } = useRaceStatus();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Button
          disabled={isRacing}
          onClick={() => dispatch(setRaceStatus("started"))}
          text="Race"
          variant="race"
        />
        <Button
          onClick={() => dispatch(setRaceStatus("stopped"))}
          text="Reset"
          variant="race"
        />
      </div>
      <CarForm />
      <div>
        <Button
          disabled={isRacing}
          onClick={async () => dispatch(generateCars())}
          text="Generate"
          variant="default"
        />
      </div>
    </div>
  );
};

export default GaragePanel;
