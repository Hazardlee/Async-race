import CarActions from "./CarActions/CarActions";
import CarControls from "./CarControls/CarControls";
import styles from "./CarTrack.module.css";
import CarTrackView from "./CarTrackView/CarTrackView";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setCurrentPage, startEditCar } from "../../../features/Cars/carsSlice";
import { deleteCar, fetchCars } from "../../../features/Cars/thunk";
import useCarEngine from "../../../hooks/useCarEngine";

import type { Car } from "../../../types/car";

const CarTrack = ({ car }: { car: Car }): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { currentPage, cars, form } = useAppSelector((state) => state.cars);
  const { carTrackRef, carRef, handleStart, handleStop, status } =
    useCarEngine(car);

  const isEditing = form.id !== null;
  const isRacing = status === "broken" || status === "driving";

  const handleDelete = async (): Promise<void> => {
    await dispatch(deleteCar(car.id)).unwrap();
    if (cars.length === 1 && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
    dispatch(fetchCars(currentPage));
  };

  return (
    <div className={styles.container}>
      <div className={styles.controlBox}>
        <CarActions
          isEditing={isEditing}
          isRacing={isRacing}
          onDelete={handleDelete}
          onEdit={() => dispatch(startEditCar(car))}
        />
        <CarControls
          onStart={handleStart}
          onStop={handleStop}
          startDisabled={status === "broken" || status === "driving"}
          stopDisabled={status === "idle"}
        />
      </div>
      <CarTrackView car={car} carRef={carRef} carTrackRef={carTrackRef} />
    </div>
  );
};

export default CarTrack;
