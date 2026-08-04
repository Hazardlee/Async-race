import CarForm from "./CarForm/CarForm";
import styles from "./GaragePanel.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectIsCarRacing } from "../../../features/CarEngine/CarEngineSlice";
import { generateCars } from "../../../features/Cars/thunk";
import { setRaceStatus } from "../../../features/Race/raceSlice";
import Button from "../../common/Button/Button";

const GaragePanel = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector((state) => state.race.raceStatus);
  const isAnyCarRacing = useAppSelector(selectIsCarRacing);
  const isRacing = raceStatus === "started" || isAnyCarRacing;

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
