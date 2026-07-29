import { createSlice } from "@reduxjs/toolkit";

import fetchCars from "./thunk";

import type { Car } from "../../types/car";

interface CarState {
  data: Car[];
}

const initialState: CarState = {
  data: [],
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default carsSlice.reducer;
