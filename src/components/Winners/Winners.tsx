import { useEffect } from "react";

import styles from "./Winners.module.css";
import WinnersTable from "./WinnersTable/WinnersTable";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { WINNERS_PAGE_SIZE } from "../../constants/pagination";
import { fetchWinners } from "../../features/Winners/thunk";
import { setCurrentPage, setSort } from "../../features/Winners/winnersSlice";
import Pagination from "../common/Pagination/Pagination";

const Winners = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { winners, totalCount, currentPage, sortField, sortOrder } =
    useAppSelector((state) => state.winners);
  const totalPages = Math.ceil(totalCount / WINNERS_PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchWinners({ page: currentPage, sortField, sortOrder }));
  }, [dispatch, currentPage, sortField, sortOrder]);

  return (
    <div className={styles.container}>
      <h2>Winners</h2>
      <WinnersTable
        sortOrder={(field) => dispatch(setSort(field))}
        winners={winners}
      />
      <div className={styles.wrapper}>
        <Pagination
          changePage={(page) => dispatch(setCurrentPage(page))}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Winners;
