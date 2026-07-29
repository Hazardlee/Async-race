import GaragePanel from "./GaragePanel/GaragePanel";

import styles from "./Garage.module.css";
import CarTrack from "./CarTrack/CarTrack";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import fetchCars from "../../features/Cars/thunk";
import type { Car } from "../../types/car";

const Garage = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.cars.data)
  useEffect(() => {
    dispatch(fetchCars())
  }, [])

  return (
  <div className={styles.container}>
    <GaragePanel />
    <div className={styles.raceContainer}>
      <div className={styles.trackContainer}>
        {data.map((car: Car) => {
          return <CarTrack car={car} key={car.id}/>;
        })}
      </div>
      <div className={`${styles.line} ${styles.finishLine}`}>
        <span>FINISH</span>
      </div>  
    </div>
  </div>
)}

export default Garage;
