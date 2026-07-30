import { createSlice } from "@reduxjs/toolkit";

import { createCar, deleteCar, fetchCars, updateCar } from "./thunk";

import type { Car } from "../../types/car";

interface CarFormState {
  id: number | null;
  name: string;
  color: string;
}

interface GarageState {
  cars: Car[];
  createForm: CarFormState;
}

const emptyForm: CarFormState = { id: null, name: "", color: "#ffffff" };

const initialState: GarageState = {
  cars: [],
  createForm: emptyForm,
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCreateForm: (state, action) => {
      state.createForm = { ...state.createForm, ...action.payload };
    },
    startEditCar: (state, action) => {
      state.createForm = { ...state.createForm, ...action.payload };
    },
    cancelEdit: (state) => {
      state.createForm = emptyForm;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.cars = action.payload;
    });
    builder.addCase(createCar.fulfilled, (state, action) => {
      state.cars.push(action.payload);
      state.createForm = emptyForm;
    });
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    });
    builder.addCase(updateCar.fulfilled, (state, action) => {
      let carToUpdate = state.cars.find((car) => car.id === action.payload.id);
      if (carToUpdate) {
        Object.assign(carToUpdate, action.payload);
      }
      state.createForm = emptyForm;
    });
  },
});

export const { setCreateForm, startEditCar, cancelEdit } = carsSlice.actions;
export default carsSlice.reducer;
