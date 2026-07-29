import styles from "./CarTrack.module.css";
import Button from "../../common/Button/Button";
import CarIcon from "../../common/CarIcon/CarIcon";

import type { Car } from "../../../types/car";

interface CarTrackProps {
  car: Car;
}

const CarTrack = ({ car }: CarTrackProps): React.ReactElement => (
  <div className={styles.container}>
    <div className={styles.controlBox}>
      <div className={styles.engineBox}>
        <Button text="Edit" variant="default" />
        <Button text="Delete" variant="default" />
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

export default CarTrack;
