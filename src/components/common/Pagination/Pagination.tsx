import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Pagination.module.css";
import Button from "../Button/Button";

interface PaginationProps {
  currentPage: number;
  changePage: (page: number) => void;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  changePage,
  totalPages,
}: PaginationProps): React.ReactElement => {
  return (
    <div className={styles.container}>
      <Button 
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <div>{`PAGE#${currentPage}`}</div>
      <Button 
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
    
  );
};

export default Pagination;
