import React from "react";

import styles from "./CarForm.module.css";
import { useAppDispatch } from "../../../../app/hooks";
import { cancelEdit, setCreateForm } from "../../../../features/Cars/carsSlice";
import useCarFormSubmit from "../../../../hooks/useCarFormSubmit";
import useCarFormValidation from "../../../../hooks/useCarFormValidation";
import useRaceStatus from "../../../../hooks/useRaceStatus";
import Button from "../../../common/Button/Button";

const CarForm = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { isRacing } = useRaceStatus();
  const { form, isValid, errorMessage } = useCarFormValidation();
  const { handleSubmit, isEditing } = useCarFormSubmit();
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <input
          required
          className={styles.inputText}
          onChange={(e) => dispatch(setCreateForm({ name: e.target.value }))}
          type="text"
          value={form.name}
        />
        {errorMessage ? (
          <span className={styles.error}>{errorMessage}</span>
        ) : null}
        <input
          className={styles.inputColor}
          onChange={(e) => dispatch(setCreateForm({ color: e.target.value }))}
          type="color"
          value={form.color}
        />
      </div>
      <Button
        disabled={isRacing || !isValid}
        text={isEditing ? "Update" : "Create"}
        type="submit"
      />
      {isEditing ? (
        <Button
          onClick={() => dispatch(cancelEdit())}
          text="Cancel"
          type="button"
        />
      ) : null}
    </form>
  );
};

export default CarForm;
