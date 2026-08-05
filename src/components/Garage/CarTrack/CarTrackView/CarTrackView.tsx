import CarIcon from "../../../common/CarIcon/CarIcon";
import styles from "../CarTrack.module.css";

import type { Car } from "../../../../types/car";

interface CarTrackViewProps {
  car: Car;
  carRef: React.RefObject<HTMLDivElement | null>;
  carTrackRef: React.RefObject<HTMLDivElement | null>;
}

const CarTrackView = ({
  car,
  carRef,
  carTrackRef,
}: CarTrackViewProps): React.ReactElement => (
  <div ref={carTrackRef} className={styles.track}>
    <div ref={carRef} className={styles.carIcon}>
      <CarIcon color={car.color} />
    </div>

    <div className={styles.carName}>{car.name}</div>
  </div>
);

export default CarTrackView;
