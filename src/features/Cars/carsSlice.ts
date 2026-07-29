import { createSlice } from "@reduxjs/toolkit";

import {createCar, deleteCar, fetchCars} from "./thunk";

import type { Car } from "../../types/car";

interface GarageState {
  cars: Car[]
  createForm: {name: string; color: string}
}

const initialState: GarageState = {
  cars: [],
  createForm: {name: '', color: '#ffffff'}
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCreateForm: (state, action) => {
      state.createForm = { ...state.createForm, ...action.payload }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.cars = action.payload;
    });
    builder.addCase(createCar.fulfilled, (state, action) => {
      state.cars.push(action.payload);
      state.createForm = { name: '', color: '#ffffff' };
    });
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload)
    })
  },
});

export const {setCreateForm} = carsSlice.actions
export default carsSlice.reducer;
