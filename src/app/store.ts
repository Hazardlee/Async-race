import { configureStore } from "@reduxjs/toolkit";

import { carsSlice } from "../features/Cars/carsSlice";
import { winnersSlice } from "../features/Winners/winnersSlice";
import { engineSlice } from "../features/CarEngine/CarEngineSlice";

const store = configureStore({
  reducer: {
    cars: carsSlice.reducer,
    winners: winnersSlice.reducer,
    engine: engineSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
