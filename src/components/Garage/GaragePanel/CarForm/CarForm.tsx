import styles from "./CarForm.module.css";
import Button from "../../../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import React, { useEffect, useState } from "react";
import { createCar, updateCar } from "../../../../features/Cars/thunk";
import { cancelEdit, setCreateForm } from "../../../../features/Cars/carsSlice";

const CarForm = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.cars.form);
  let isEditing = form.id !== null;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.name.length > 12) return;
    isEditing
      ? dispatch(
          updateCar({
            id: form.id as number,
            name: form.name,
            color: form.color,
          }),
        )
      : dispatch(createCar(form));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <input
          className={styles.inputText}
          type="text"
          onChange={(e) => dispatch(setCreateForm({ name: e.target.value }))}
          value={form.name}
          required
        />
        <input
          className={styles.inputColor}
          type="color"
          onChange={(e) => dispatch(setCreateForm({ color: e.target.value }))}
          value={form.color}
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
