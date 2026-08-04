import React from "react";

import styles from "./CarForm.module.css";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import MAX_FORM_NAME from "../../../../constants/form";
import { GARAGE_PAGE_SIZE } from "../../../../constants/pagination";
import { selectIsCarRacing } from "../../../../features/CarEngine/CarEngineSlice";
import {
  cancelEdit,
  setCreateForm,
  setCurrentPage,
} from "../../../../features/Cars/carsSlice";
import {
  createCar,
  fetchCars,
  updateCar,
} from "../../../../features/Cars/thunk";
import Button from "../../../common/Button/Button";

const CarForm = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { currentPage, cars, form } = useAppSelector((state) => state.cars);
  const raceStatus = useAppSelector((state) => state.race.raceStatus);
  const isAnyCarRacing = useAppSelector(selectIsCarRacing);
  const isRacing = raceStatus === "started" || isAnyCarRacing;
  const isEditing = form.id !== null;
  const isTooLong = form.name.length > MAX_FORM_NAME;
  const isEmpty = form.name.length === 0;
  const isValid = !isEmpty && !isTooLong;

  const errorMessage = isTooLong
    ? `Name must be fewer than ${MAX_FORM_NAME}`
    : null;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
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
