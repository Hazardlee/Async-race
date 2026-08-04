import { createAsyncThunk } from "@reduxjs/toolkit";
import { setRaceWinner } from "./raceSlice";
import type { RootState } from "../../app/store";
import type { RaceWinner } from "../../types/winners";
import { saveWinner } from "../Winners/thunk";

export const finishRace = createAsyncThunk<void, RaceWinner>('race/finish',
  async (payload, {dispatch, getState}) => {
    dispatch(setRaceWinner(payload))
    const state = getState() as RootState
    const trueWinner = state.race.raceWinner?.id === payload.id && state.race.isWinnerDeclared
    if (trueWinner) {
      await dispatch(saveWinner(payload))
    }

  }
)