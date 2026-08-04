import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchWinners } from "./thunk";
import type { IWinnersWithCars, Winner } from "../../types/winners";

export type SortField = "wins" | "time" | null;
export type SortOrder = "ASC" | "DESC";

interface WinnersViewState {
  winners: IWinnersWithCars[];
  totalCount: number;
  currentPage: number;
  sortField: SortField;
  sortOrder: SortOrder;
}

const initialState: WinnersViewState = {
  winners: [],
  totalCount: 0,
  currentPage: 1,
  sortField: null,
  sortOrder: "ASC",
};

export const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSort: (state, action: PayloadAction<SortField>) => {
      if (state.sortField === action.payload ) {
       state.sortOrder = state.sortOrder === "ASC" ? "DESC" : "ASC";
      } else {
        state.sortField = action.payload
        state.sortOrder = "ASC";
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchWinners.fulfilled, (state, action) => {
      state.winners = action.payload.winnersWithCars;
      state.totalCount = action.payload.totalCount;
    });
  },
});

export const { setCurrentPage, setSort } = winnersSlice.actions;

export default winnersSlice.reducer;
