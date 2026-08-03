import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type Status = "idle" | "broken" | "driving";

interface carEngineState {
  carStatuses: Record<number, Status>;
}

const initialState: carEngineState = {
  carStatuses: {},
};

export const engineSlice = createSlice({
  name: "engine",
  initialState,
  reducers: {
    setCarStatus: (
      state,
      action: PayloadAction<{ id: number; status: Status }>,
    ) => {
      state.carStatuses[action.payload.id] = action.payload.status;
    },
  },
});

export const selectIsCarRacing = (state: RootState): boolean =>
  Object.values(state.engine.carStatuses).some(
    (status) => status === "driving" || status === "broken",
  );

export const { setCarStatus } = engineSlice.actions;
