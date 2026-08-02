import Button from "../../../common/Button/Button";
import styles from './CarControls.module.css'

interface CarControlsProps {
  onStart: () => void,
  onStop: () => void,
  startDisabled: boolean
  stopDisabled: boolean
}

const CarControls = ({onStart, onStop, startDisabled, stopDisabled}: CarControlsProps ): React.ReactElement => (
  <div className={styles.engineBox}>
    <Button text="Start" variant="default" onClick={() => onStart()} disabled={startDisabled}/>
    <Button text="Stop" variant="default" onClick={() => onStop()} disabled={stopDisabled}/>
  </div>
);

export default CarControls