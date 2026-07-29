import { createSlice } from "@reduxjs/toolkit";
import type { Car } from "../../types/car";
import fetchCars from "./thunk";

interface CarState {
  data: Car[];
}

const initialState: CarState = {
  data: [],
}

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})


export default carsSlice.reducer