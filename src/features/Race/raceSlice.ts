import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Status = 'idle' | 'stopped' | 'started'

interface raceEngineState {
  raceStatus: Status
}


const initialState: raceEngineState = {
  raceStatus: 'idle'
}

export const raceSlice = createSlice({
  name: "race",
  initialState,
  reducers: {
    setRaceStatus: (state, action: PayloadAction<Status>) => {
      state.raceStatus = action.payload
    } 
  },
});

export const {setRaceStatus} = raceSlice.actions