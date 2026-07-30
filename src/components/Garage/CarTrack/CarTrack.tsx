import styles from "./CarTrack.module.css";
import Button from "../../common/Button/Button";
import CarIcon from "../../common/CarIcon/CarIcon";

import type { Car } from "../../../types/car";
import { useAppDispatch } from "../../../app/hooks";
import { deleteCar } from "../../../features/Cars/thunk";
import { startEditCar } from "../../../features/Cars/carsSlice";

interface CarTrackProps {
  car: Car;
}

const CarTrack = ({ car }: CarTrackProps): React.ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.controlBox}>
        <div className={styles.engineBox}>
          <Button
            text="Edit"
            variant="default"
            onClick={() => dispatch(startEditCar(car))}
          />
          <Button
            text="Delete"
            variant="default"
            onClick={() => dispatch(deleteCar(car.id))}
          />
        </div>
        <div className={styles.engineBox}>
          <Button text="Start" variant="default" />
          <Button text="Stop" variant="default" />
        </div>
      </div>
      <div className={styles.track}>
        <CarIcon color={car.color} />
        <div className={styles.carName}>{car.name}</div>
      </div>
    </div>
  );
};

export default CarTrack;
