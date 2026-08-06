import finishRace from "../features/Race/thunk";

import type { AppDispatch } from "../app/store";
import type { Car } from "../types/car";

const dispatchFinishRace = (
  dispatch: AppDispatch,
  car: Car,
  duration: number,
): void => {
  dispatch(finishRace({ id: car.id, name: car.name, time: duration / 1000 }));
};

export default dispatchFinishRace;
