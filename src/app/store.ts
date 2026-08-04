import { configureStore } from "@reduxjs/toolkit";

import { engineSlice } from "../features/CarEngine/CarEngineSlice";
import { carsSlice } from "../features/Cars/carsSlice";
import { raceSlice } from "../features/Race/raceSlice";
import { winnersSlice } from "../features/Winners/winnersSlice";

const store = configureStore({
  reducer: {
    cars: carsSlice.reducer,
    winners: winnersSlice.reducer,
    engine: engineSlice.reducer,
    race: raceSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
