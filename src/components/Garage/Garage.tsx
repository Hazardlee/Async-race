import { useEffect, useState } from "react";

import CarTrack from "./CarTrack/CarTrack";
import styles from "./Garage.module.css";
import GaragePanel from "./GaragePanel/GaragePanel";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCars } from "../../features/Cars/thunk";

import type { Car } from "../../types/car";
import Pagination from "../common/Pagination/Pagination";
import { setCurrentPage } from "../../features/Cars/carsSlice";
import { GARAGE_PAGE_SIZE } from "../../constants/pagination";
import {  setRaceStatus, setRaceWinner } from "../../features/Race/raceSlice";
import { selectIsCarRacing } from "../../features/CarEngine/CarEngineSlice";
import Modal from "../common/Modal/Modal";

const Garage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { cars, currentPage, totalCount } = useAppSelector(
    (state) => state.cars,
  );
  const raceStatus = useAppSelector((state) => state.race.raceStatus);
  const isAnyCarRacing = useAppSelector(selectIsCarRacing);
  const isRacing = raceStatus === "started" || isAnyCarRacing;

  let totalPages = Math.ceil(totalCount / GARAGE_PAGE_SIZE);
  const winner = useAppSelector((state) => state.race.raceWinner);

  useEffect(() => {
    dispatch(fetchCars(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    return () => {
      dispatch(setRaceStatus("idle"));
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2>Garage</h2>
      {winner && (
        <Modal
          winnerName={winner.name}
          time={winner.time}
          onClose={() => dispatch(setRaceWinner(null))}
          isOpen={!!winner}
        />
      )}
      <GaragePanel />
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
          changePage={(newPage: number) => dispatch(setCurrentPage(newPage))}
          totalPages={totalPages}
          isRacing={isRacing}
        />
      </div>
    </div>
  );
};

export default Garage;
