import styles from "./CarForm.module.css";
import Button from "../../../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import React, { useEffect, useState } from "react";
import { createCar, updateCar } from "../../../../features/Cars/thunk";
import { cancelEdit, setCreateForm } from "../../../../features/Cars/carsSlice";

const CarForm = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const createForm = useAppSelector((state) => state.cars.createForm);
  let isEditing = createForm.id !== null;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (createForm.name.length > 12) return;
    isEditing
      ? dispatch(
          updateCar({
            id: createForm.id as number,
            name: createForm.name,
            color: createForm.color,
          }),
        )
      : dispatch(createCar(createForm));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <input
          className={styles.inputText}
          type="text"
          onChange={(e) => dispatch(setCreateForm({ name: e.target.value }))}
          value={createForm.name}
          required
        />
        <input
          className={styles.inputColor}
          type="color"
          onChange={(e) => dispatch(setCreateForm({ color: e.target.value }))}
          value={createForm.color}
        />
      </div>
      <Button text={isEditing ? "Update" : "Create"} type="submit" />

      {isEditing && (
        <Button
          text="Cancel"
          type="button"
          onClick={() => dispatch(cancelEdit())}
        />
      )}
    </form>
  );
};

export default CarForm;
