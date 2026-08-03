import styles from "./CarForm.module.css";
import Button from "../../../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import React, { useEffect, useState } from "react";
import {
  createCar,
  fetchCars,
  updateCar,
} from "../../../../features/Cars/thunk";
import {
  cancelEdit,
  setCreateForm,
  setCurrentPage,
} from "../../../../features/Cars/carsSlice";
import { GARAGE_PAGE_SIZE } from "../../../../constants/pagination";
import { selectIsCarRacing } from "../../../../features/CarEngine/CarEngineSlice";

const CarForm = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.cars.form);
  const raceStatus = useAppSelector((state) => state.race.raceStatus);
  const isAnyCarRacing = useAppSelector(selectIsCarRacing);
  const isRacing = raceStatus === "started" || isAnyCarRacing;
  let isEditing = form.id !== null;
  const { currentPage, cars } = useAppSelector((state) => state.cars);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.name.length > 12) return;
    isEditing
      ? await dispatch(
          updateCar({
            id: form.id as number,
            name: form.name,
            color: form.color,
          }),
        )
      : await dispatch(createCar(form));

    const isPageFull = cars.length === GARAGE_PAGE_SIZE;
    if (isPageFull && !isEditing) dispatch(setCurrentPage(currentPage + 1));
    dispatch(fetchCars(currentPage));
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
      <Button
        text={isEditing ? "Update" : "Create"}
        type="submit"
        disabled={isRacing}
      />

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
