import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import type { RaceWinner } from "../../types/winners";

type Status = "idle" | "stopped" | "started";

interface RaceEngineState {
  raceStatus: Status;
  commandId: number; 
  raceWinner: RaceWinner | null;
  isWinnerDeclared: boolean;
}

const initialState: RaceEngineState = {
  raceStatus: "idle",
  commandId: 0,
  raceWinner: null,
  isWinnerDeclared: false,
};

export const raceSlice = createSlice({
  name: "race",
  initialState,
  reducers: {
    setRaceStatus: (state, action: PayloadAction<Status>) => {
      state.raceStatus = action.payload;
      state.commandId += 1;
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
