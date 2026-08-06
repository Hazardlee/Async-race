import { setCarStatus } from "../features/CarEngine/CarEngineSlice";
import { driveCar } from "../features/CarEngine/thunk";

import type { AppDispatch } from "../app/store";

const watchDriveStatus = async (
  dispatch: AppDispatch,
  carId: number,
  animation: Animation,
  requestId: number,
  requestIdRef: React.RefObject<number>,
): Promise<void> => {
  try {
    await dispatch(driveCar(carId)).unwrap();
  } catch {
    if (requestId !== requestIdRef.current) return;
    animation.pause();
    dispatch(setCarStatus({ id: carId, status: "broken" }));
  }
};

export default watchDriveStatus;
