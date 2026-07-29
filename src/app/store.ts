import { configureStore } from "@reduxjs/toolkit";

import { carsSlice } from "../features/Cars/carsSlice";

const store = configureStore({
  reducer: { cars: carsSlice.reducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
