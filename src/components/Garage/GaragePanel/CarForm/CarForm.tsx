import Button from "../../../common/Button/Button"
import styles from './CarForm.module.css'


const CarForm = ():React.ReactElement => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <input type="text" className={styles.inputText}></input>
      <input type="color" className={styles.inputColor }></input>
    </div>
    <Button variant="create"/>
  </div>
)

export default CarForm