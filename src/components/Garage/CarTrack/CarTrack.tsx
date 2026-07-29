import type { Car } from "../../../types/car";
import Button from "../../common/Button/Button";
import { CarIcon } from "../../common/CarIcon/CarIcon";
import styles from "./CarTrack.module.css";

interface CarTrackProps {
  car: Car;
}

const CarTrack = ({ car }: CarTrackProps): React.ReactElement => (
  <div className={styles.container}>
    <div className={styles.controlBox}>
      <div className={styles.engineBox}>
        <Button variant='edit'/>
        <Button variant='delete'/>
      </div>
      <div className={styles.engineBox}>
        <Button variant='start'/>
        <Button variant='stop'/>
      </div>
    </div>
    <div className={styles.track}>
      <CarIcon color={car.color}/>
      <div className={styles.carName}>{car.name}</div>
    </div>
  </div>
);

export default CarTrack;
