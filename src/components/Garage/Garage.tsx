import GaragePanel from "./GaragePanel/GaragePanel";

import styles from "./Garage.module.css";
import CarTrack from "./CarTrack/CarTrack";

const data = [
  { id: 1, name: "tesla", color: "#e6e6fa" },
  { id: 2, name: "tasdsad", color: "#fc03f0" },
  { id: 3, name: "tasddddsad", color: "#03fcf4" },
];

const Garage = (): React.ReactElement => (
  <div className={styles.container}>
    <GaragePanel />
    <div className={styles.raceContainer}>
      <div className={styles.trackContainer}>
        {data.map((car) => {
          return <CarTrack car={car} key={car.id}/>;
        })}
      </div>
      <div className={`${styles.line} ${styles.finishLine}`}>
        <span>FINISH</span>
      </div>  
    </div>
  </div>
);

export default Garage;
