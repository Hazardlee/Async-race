import Button from '../../common/Button/Button'
import CarForm from './CarForm/CarForm'
import styles from './GaragePanel.module.css'

const GaragePanel = (): React.ReactElement => (
   <div className={styles.container}>
      <div className={styles.wrapper}>
         <Button variant='race'/><Button variant='reset'/>
      </div>
      <CarForm/>
      <div><Button variant='generate'/></div>
    </div>
) 

export default GaragePanel