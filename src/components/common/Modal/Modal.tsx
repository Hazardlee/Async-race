import { useEffect } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Modal.module.css";
import Button from "../Button/Button";

interface ModalProps {
  winnerName: string;
  time: number;
  onClose: () => void;
  isOpen: boolean;
}

const Modal = ({
  winnerName,
  time,
  onClose,
  isOpen,
}: ModalProps): React.ReactElement | null => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Button className={styles.close} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        <span>
          <b>Winner</b>
        </span>
        <span>{winnerName}</span>
        <span>{`${time.toFixed(2)}s`}</span>
      </div>
    </div>
  );
};
export default Modal;
