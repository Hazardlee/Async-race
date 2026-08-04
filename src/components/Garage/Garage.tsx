import React, { useEffect } from "react";

import CarTrack from "./CarTrack/CarTrack";
import styles from "./Garage.module.css";
import GaragePanel from "./GaragePanel/GaragePanel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GARAGE_PAGE_SIZE } from "../../constants/pagination";
import { selectIsCarRacing } from "../../features/CarEngine/CarEngineSlice";
import { setCurrentPage } from "../../features/Cars/carsSlice";
import { fetchCars } from "../../features/Cars/thunk";
import { setRaceStatus, setRaceWinner } from "../../features/Race/raceSlice";
import Modal from "../common/Modal/Modal";
import Pagination from "../common/Pagination/Pagination";

import type { Car } from "../../types/car";

const Garage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { cars, currentPage, totalCount } = useAppSelector(
    (state) => state.cars,
  );
  const emptyGarage = cars.length === 0;
  const raceStatus = useAppSelector((state) => state.race.raceStatus);
  const isAnyCarRacing = useAppSelector(selectIsCarRacing);
  const isRacing = raceStatus === "started" || isAnyCarRacing;

  const totalPages = Math.ceil(totalCount / GARAGE_PAGE_SIZE);
  const winner = useAppSelector((state) => state.race.raceWinner);

  useEffect(() => {
    dispatch(fetchCars(currentPage));
  }, [dispatch, currentPage]);

  useEffect(
    () => () => {
      dispatch(setRaceStatus("idle"));
    },
    [dispatch],
  );

  return (
    <div className={styles.container}>
      {winner ? (
        <Modal
          isOpen={!!winner}
          onClose={() => dispatch(setRaceWinner(null))}
          time={winner.time}
          winnerName={winner.name}
        />
      ) : null}
      <h2>Garage</h2>
      <GaragePanel />
      {emptyGarage ? (
        <div>No cars</div>
      ) : (
        <React.Fragment>
          <div className={styles.raceContainer}>
            <div className={styles.trackContainer}>
              {cars.map((car: Car) => (
                <CarTrack key={car.id} car={car} />
              ))}
            </div>
            <div className={`${styles.line} ${styles.finishLine}`}>
              <span>FINISH</span>
            </div>
          </div>
          <div className={styles.paginationContainer}>
            <div>{`Total ${totalCount}`}</div>
            <Pagination
              currentPage={currentPage}
              isRacing={isRacing}
              totalPages={totalPages}
              changePage={(newPage: number) =>
                dispatch(setCurrentPage(newPage))
              }
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Garage;
