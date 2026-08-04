import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Pagination.module.css";
import Button from "../Button/Button";

interface PaginationProps {
  currentPage: number;
  changePage: (page: number) => void;
  totalPages: number;
  isRacing?: boolean;
}

const Pagination = ({
  currentPage,
  changePage,
  totalPages,
  isRacing = false,
}: PaginationProps): React.ReactElement => (
  <div className={styles.container}>
    <Button
      disabled={currentPage <= 1 || isRacing}
      onClick={() => changePage(currentPage - 1)}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </Button>
    <div>{`PAGE#${currentPage}`}</div>
    <Button
      disabled={currentPage >= totalPages || isRacing}
      onClick={() => changePage(currentPage + 1)}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </Button>
  </div>
);

export default Pagination;
