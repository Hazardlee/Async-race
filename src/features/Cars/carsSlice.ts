import { createSlice } from "@reduxjs/toolkit";

import {
  createCar,
  deleteCar,
  fetchCars,
  generateCars,
  updateCar,
} from "./thunk";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { Car } from "../../types/car";

interface CarFormState {
  id: number | null;
  name: string;
  color: string;
}

interface GarageState {
  cars: Car[];
  form: CarFormState;
  currentPage: number;
  totalCount: number;
}

const emptyForm: CarFormState = { id: null, name: "", color: "#ffffff" };

const initialState: GarageState = {
  cars: [],
  form: emptyForm,
  currentPage: 1,
  totalCount: 0,
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCreateForm: (state, action: PayloadAction<Partial<CarFormState>>) => {
      state.form = { ...state.form, ...action.payload };
    },
    startEditCar: (state, action: PayloadAction<Car>) => {
      state.form = { ...state.form, ...action.payload };
    },
    cancelEdit: (state) => {
      state.form = emptyForm;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.cars = action.payload.data;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(createCar.fulfilled, (state) => {
      // state.cars.push(action.payload);
      state.form = emptyForm;
    });
    builder.addCase(deleteCar.fulfilled, () => {});
    builder.addCase(updateCar.fulfilled, (state, action) => {
      const carToUpdate = state.cars.find(
        (car) => car.id === action.payload.id,
      );
      if (carToUpdate) {
        Object.assign(carToUpdate, action.payload);
      }
      state.form = emptyForm;
    });
    builder.addCase(generateCars.fulfilled, () => {});
  },
});

export const { setCreateForm, startEditCar, cancelEdit, setCurrentPage } =
  carsSlice.actions;
export default carsSlice.reducer;
