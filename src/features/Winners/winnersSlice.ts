import { createSlice } from "@reduxjs/toolkit";
import { fetchWinners } from "./thunk";
import type { IWinnersWithCars, Winner } from "../../types/winners";

interface WinnersViewState  {
  winners: IWinnersWithCars[]
}

const initialState: WinnersViewState =  {
  winners: [],
};

export const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchWinners.fulfilled, (state, action) => {
      state.winners = action.payload;
    });
  },
});

export default winnersSlice.reducer;