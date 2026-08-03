import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Container from "../common/Container/Container";
import styles from "./Winners.module.css";
import WinnersTable from "./WinnersTable/WinnersTable";
import { fetchWinners } from "../../features/Winners/thunk";
import Pagination from "../common/Pagination/Pagination";
import { WINNERS_PAGE_SIZE } from "../../constants/pagination";
import { setCurrentPage } from "../../features/Winners/winnersSlice";

const Winners = () => {
  const dispatch = useAppDispatch();
  const { winners, totalCount, currentPage } = useAppSelector(
    (state) => state.winners,
  );
  const totalPages = Math.ceil(totalCount / WINNERS_PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchWinners(currentPage));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2>Winners</h2>
      <WinnersTable winners={winners} />
      <div className={styles.wrapper}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={(page) => dispatch(setCurrentPage(page))}
        />
      </div>
    </div>
  );
};

export default Winners;
