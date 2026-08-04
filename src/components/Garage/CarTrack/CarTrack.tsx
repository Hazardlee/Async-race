import CarControls from "./CarControls/CarControls";
import styles from "./CarTrack.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setCurrentPage, startEditCar } from "../../../features/Cars/carsSlice";
import { deleteCar, fetchCars } from "../../../features/Cars/thunk";
import useCarEngine from "../../../hooks/useCarEngine";
import Button from "../../common/Button/Button";
import CarIcon from "../../common/CarIcon/CarIcon";

import type { Car } from "../../../types/car";

interface CarTrackProps {
  car: Car;
}

const CarTrack = ({ car }: CarTrackProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { currentPage, cars, form } = useAppSelector((state) => state.cars);

  const isEditing = form.id !== null;
  const { carTrackRef, carRef, handleStart, handleStop, status } =
    useCarEngine(car);

  const isRacing = status === "broken" || status === "driving";

  const handleDelete = async (): Promise<void> => {
    await dispatch(deleteCar(car.id)).unwrap();
    const isLastCarOnPage = cars.length === 1;
    if (isLastCarOnPage && currentPage > 1)
      dispatch(setCurrentPage(currentPage - 1));
    dispatch(fetchCars(currentPage));
  };

  return (
    <div className={styles.container}>
      <div className={styles.controlBox}>
        <div className={styles.engineBox}>
          <Button
            disabled={isRacing}
            onClick={() => dispatch(startEditCar(car))}
            text="Edit"
            variant="default"
          />
          <Button
            disabled={isEditing || isRacing}
            onClick={async () => handleDelete()}
            text="Delete"
            variant="default"
          />
        </div>
        <CarControls
          onStart={handleStart}
          onStop={handleStop}
          startDisabled={status === "broken" || status === "driving"}
          stopDisabled={status === "idle"}
        />
      </div>
      <div ref={carTrackRef} className={styles.track}>
        <div ref={carRef} className={styles.carIcon}>
          <CarIcon color={car.color} />
        </div>
        <div className={styles.carName}>{car.name}</div>
      </div>
    </div>
  );
};

export default CarTrack;
