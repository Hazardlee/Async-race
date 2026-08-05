import Button from "../../../common/Button/Button";
import styles from "../CarTrack.module.css";

interface CarActionsProps {
  isEditing: boolean;
  isRacing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const CarActions = ({
  isEditing,
  isRacing,
  onEdit,
  onDelete,
}: CarActionsProps): React.ReactElement => (
  <div className={styles.engineBox}>
    <Button disabled={isRacing} onClick={onEdit} text="Edit" />
    <Button disabled={isEditing || isRacing} onClick={onDelete} text="Delete" />
  </div>
);

export default CarActions;
