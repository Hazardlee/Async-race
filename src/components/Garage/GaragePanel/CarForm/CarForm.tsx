import styles from "./CarForm.module.css";
import Button from "../../../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import React, { useEffect, useState } from "react";
import { createCar } from "../../../../features/Cars/thunk";
import { setCreateForm } from "../../../../features/Cars/carsSlice";

const CarForm = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const createForm = useAppSelector((state) => state.cars.createForm);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
     if (createForm.name.length > 12) return;
    dispatch(createCar(createForm));
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setCreateForm({ ...createForm, name: e.target.value }));
  // };

  // const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setCreateForm({ ...createForm, color: e.target.value }));
  // };

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
      <Button text="Create" variant="default" type="submit" />
    </form>
  );
};

export default CarForm;
