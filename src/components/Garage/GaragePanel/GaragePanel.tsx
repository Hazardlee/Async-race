import CarForm from "./CarForm/CarForm";
import styles from "./GaragePanel.module.css";
import Button from "../../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { generateCars } from "../../../features/Cars/thunk";
import { setRaceStatus } from "../../../features/Race/raceSlice";
import { selectIsCarRacing } from "../../../features/CarEngine/CarEngineSlice";

const GaragePanel = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector((state) => state.race.raceStatus)
  const isAnyCarRacing = useAppSelector(selectIsCarRacing)
  const isRacing = raceStatus === "started" || isAnyCarRacing

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Button
          text="Race"
          variant="race"
          onClick={() => dispatch(setRaceStatus("started"))}
          disabled={isRacing}
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
          disabled={isRacing}
        />
      </div>
    </div>
  );
};

export default GaragePanel;
