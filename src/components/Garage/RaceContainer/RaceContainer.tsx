import React from "react";

import CarTrack from "../CarTrack/CarTrack";
import styles from "../Garage.module.css";

import type { Car } from "../../../types/car";

interface RaceContainerProps {
  cars: Car[];
}

const RaceContainer = ({ cars }: RaceContainerProps): React.ReactElement => (
  <div className={styles.raceContainer}>
    <div className={styles.trackContainer}>
      {cars.map((car) => (
        <CarTrack key={car.id} car={car} />
      ))}
    </div>
    <div className={`${styles.line} ${styles.finishLine}`}>
      <span>FINISH</span>
    </div>
  </div>
);

export default RaceContainer;
