import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RaceWinner } from "../../types/winners";

type Status = "idle" | "stopped" | "started";

interface raceEngineState {
  raceStatus: Status;
  raceWinner: RaceWinner | null;
  isWinnerDeclared: boolean;
}

const initialState: raceEngineState = {
  raceStatus: "idle",
  raceWinner: null,
  isWinnerDeclared: false,
};

export const raceSlice = createSlice({
  name: "race",
  initialState,
  reducers: {
    setRaceStatus: (state, action: PayloadAction<Status>) => {
      state.raceStatus = action.payload;
      if (action.payload === "started") {
        state.isWinnerDeclared = false;
        state.raceWinner = null;
      }
    },
    setRaceWinner: (state, action: PayloadAction<RaceWinner | null>) => {
      if (action.payload === null) {
        state.raceWinner = null;
        return;
      }

      if (state.raceStatus === "started" && !state.isWinnerDeclared) {
        state.raceWinner = action.payload;
        state.isWinnerDeclared = true;
      }
    },
  },
});

export const { setRaceStatus, setRaceWinner } = raceSlice.actions;
