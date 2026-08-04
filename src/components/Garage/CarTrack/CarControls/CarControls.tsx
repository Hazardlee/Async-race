import styles from "./CarControls.module.css";
import Button from "../../../common/Button/Button";

interface CarControlsProps {
  onStart: () => void;
  onStop: () => void;
  startDisabled: boolean;
  stopDisabled: boolean;
}

const CarControls = ({
  onStart,
  onStop,
  startDisabled,
  stopDisabled,
}: CarControlsProps): React.ReactElement => (
  <div className={styles.engineBox}>
    <Button
      disabled={startDisabled}
      onClick={() => onStart()}
      text="Start"
      variant="default"
    />
    <Button
      disabled={stopDisabled}
      onClick={() => onStop()}
      text="Stop"
      variant="default"
    />
  </div>
);

export default CarControls;
