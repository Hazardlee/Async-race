import React from "react";

import styles from "./Garage.module.css";
import GaragePanel from "./GaragePanel/GaragePanel";
import RaceContainer from "./RaceContainer/RaceContainer";
import useGarageCars from "../../hooks/useGarageCars";
import useRaceStatus from "../../hooks/useRaceStatus";
import Modal from "../common/Modal/Modal";
import Pagination from "../common/Pagination/Pagination";

const Garage = (): React.ReactElement => {
  const { cars, currentPage, totalCount, totalPages, emptyGarage, changePage } =
    useGarageCars();

  const { winner, isRacing, resetWinner } = useRaceStatus();

  return (
    <div className={styles.container}>
      {winner ? (
        <Modal
          isOpen={!!winner}
          onClose={resetWinner}
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
          <RaceContainer cars={cars} />
          <div className={styles.paginationContainer}>
            <div>{`Total ${totalCount}`}</div>
            <Pagination
              changePage={changePage}
              currentPage={currentPage}
              isRacing={isRacing}
              totalPages={totalPages}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Garage;
