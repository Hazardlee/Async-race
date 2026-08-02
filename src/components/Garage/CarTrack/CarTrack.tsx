import styles from "./CarTrack.module.css";
import Button from "../../common/Button/Button";
import CarIcon from "../../common/CarIcon/CarIcon";

import type { Car } from "../../../types/car";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteCar, fetchCars } from "../../../features/Cars/thunk";
import { setCurrentPage, startEditCar } from "../../../features/Cars/carsSlice";
import CarControls from "./CarControls/CarControls";
import useCarEngine from "../../../hooks/useCarEngine";

interface CarTrackProps {
  car: Car;
}

const CarTrack = ({ car }: CarTrackProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { currentPage, cars } = useAppSelector((state) => state.cars);

  const handleDelete = async (): Promise<void> => {
    await dispatch(deleteCar(car.id)).unwrap();
    const isLastCarOnPage = cars.length === 1;
    if (isLastCarOnPage && currentPage > 1)
      dispatch(setCurrentPage(currentPage - 1));
    dispatch(fetchCars(currentPage));
  };

  const { carTrackRef, carRef, handleStart, handleStop, status } =
    useCarEngine(car);

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
            onClick={() => handleDelete()}
          />
        </div>
        <CarControls
          onStart={handleStart}
          onStop={handleStop}
          startDisabled={status === 'broken' || status === 'driving'}
          stopDisabled={status === 'idle'}
        />
      </div>
      <div className={styles.track} ref={carTrackRef}>
        <div ref={carRef} className={styles.carIcon}>
          <CarIcon color={car.color} />
        </div>
        <div className={styles.carName}>{car.name}</div>
      </div>
    </div>
  );
};

export default CarTrack;
