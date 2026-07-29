import { useEffect } from "react";

import CarTrack from "./CarTrack/CarTrack";
import styles from "./Garage.module.css";
import GaragePanel from "./GaragePanel/GaragePanel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import fetchCars from "../../features/Cars/thunk";

import type { Car } from "../../types/car";

const Garage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.cars.data);
  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <GaragePanel />
      <div className={styles.raceContainer}>
        <div className={styles.trackContainer}>
          {data.map((car: Car) => (
            <CarTrack key={car.id} car={car} />
          ))}
        </div>
        <div className={`${styles.line} ${styles.finishLine}`}>
          <span>FINISH</span>
        </div>
      </div>
    </div>
  );
};

export default Garage;
