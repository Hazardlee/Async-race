import { createSlice } from "@reduxjs/toolkit";
import { fetchWinners } from "./thunk";
import type { IWinnersWithCars, Winner } from "../../types/winners";

interface WinnersViewState  {
  winners: IWinnersWithCars[]
  totalCount: number
  currentPage: number
}

const initialState: WinnersViewState =  {
  winners: [],
  totalCount: 0,
  currentPage: 1
};

export const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchWinners.fulfilled, (state, action) => {
      state.winners = action.payload.winnersWithCars;
      state.totalCount = action.payload.totalCount
    });
  },
});

export const {setCurrentPage} = winnersSlice.actions

export default winnersSlice.reducer;