import type { Car } from '../../../types/car';
import { CarIcon } from '../../common/CarIcon/CarIcon';
import styles from './CarTrack.module.css'

interface CarTrackProps {
  car: Car;
}

const CarTrack = ({car}: CarTrackProps):React.ReactElement => (
  <div className={styles.container}>
    <div>carcontrols</div>
    <div className={styles.track}>
      <CarIcon/>
      <div>{car.name}</div>
    </div>
  </div>
)

export default CarTrack 