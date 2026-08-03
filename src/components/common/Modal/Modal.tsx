import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import styles from "./Modal.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  winnerName: string,
  time: number,
  onClose: () => void,
  isOpen: boolean
}

const Modal = ({winnerName, time, onClose, isOpen}: ModalProps): React.ReactElement | null => {
  if (!isOpen) return null;
  
  return (
  <div className={styles.overlay} onClick={() => onClose()}>
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <Button className={styles.close} onClick={() => onClose()}>
        <FontAwesomeIcon icon={faXmark} />
      </Button>
      <span><b>Winner</b></span>
      <span>{winnerName}</span>
      <span>{`${time.toFixed(2)}s`}</span>
    </div>
  </div>
)};
export default Modal;
