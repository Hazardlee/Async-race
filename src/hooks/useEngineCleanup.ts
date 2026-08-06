import { useEffect, useRef } from "react";

import { useAppDispatch } from "../app/hooks";
import { setCarStatus } from "../features/CarEngine/CarEngineSlice";

const useEngineCleanup = (
  carId: number,
  status: "idle" | "driving" | "broken",
  animationRef: React.RefObject<Animation | null>,
): React.RefObject<number> => {
  const dispatch = useAppDispatch();
  const requestIdRef = useRef(0);
  const statusRef = useRef(status);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(
    () => () => {
      requestIdRef.current += 1;
      animationRef.current?.cancel();
      if (statusRef.current === "broken" || statusRef.current === "driving") {
        dispatch(setCarStatus({ id: carId, status: "idle" }));
      }
    },
    [carId, dispatch, animationRef],
  );

  return requestIdRef;
};

export default useEngineCleanup;
