import styles from "./WinnersTable.module.css";
import CarIcon from "../../common/CarIcon/CarIcon";
import type { IWinnersWithCars } from "../../../types/winners";

const WinnersTable = ({ winners }: { winners: IWinnersWithCars[] }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Car</th>
          <th scope="col">Name</th>
          <th scope="col">Wins</th>
          <th scope="col">Best Time (seconds)</th>
        </tr>
      </thead>
      <tbody>
        {winners.map((w) => (
          <tr key={w.id}>
            <td>{w.id}</td>
            <td>
              <CarIcon color={w.color} />
            </td>
            <td>{w.name}</td>
            <td>{w.wins}</td>
            <td>{w.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WinnersTable;
