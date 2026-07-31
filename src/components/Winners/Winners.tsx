import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Container from "../common/Container/Container";
import styles from "./Winners.module.css";
import WinnersTable from "./WinnersTable/WinnersTable";
import { fetchWinners } from "../../features/Winners/thunk";

const Winners = () => {
  const dispatch = useAppDispatch();
  const {winners} = useAppSelector((state) => state.winners);

  useEffect(() => {
    dispatch(fetchWinners());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2>Winners</h2>
      <WinnersTable winners={winners}/>
    </div>
  );
};

export default Winners;
