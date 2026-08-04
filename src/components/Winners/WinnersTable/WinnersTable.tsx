import styles from "./WinnersTable.module.css";
import CarIcon from "../../common/CarIcon/CarIcon";

import type { IWinnersWithCars } from "../../../types/winners";

interface WinnersTableProps {
  winners: IWinnersWithCars[];
  sortOrder: (field: "wins" | "time") => void;
}
const WinnersTable = ({
  winners,
  sortOrder,
}: WinnersTableProps): React.ReactElement => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th scope="col">№</th>
        <th scope="col">Car</th>
        <th scope="col">Name</th>
        <th
          className={styles.sort}
          onClick={() => sortOrder("wins")}
          scope="col"
        >
          Wins
        </th>
        <th
          className={styles.sort}
          onClick={() => sortOrder("time")}
          scope="col"
        >
          Best Time (seconds)
        </th>
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

export default WinnersTable;
