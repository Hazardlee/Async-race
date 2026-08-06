import { useRef } from "react";

import useEngineCleanup from "./useEngineCleanup";
import useRaceCommandEffect from "./useRaceCommandEffect";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCarStatus } from "../features/CarEngine/CarEngineSlice";
import { startCar, stopCar } from "../features/CarEngine/thunk";
import dispatchFinishRace from "../helpers/dispatchFinishRace";
import createDriveAnimation from "../helpers/engineAnimation";
import watchDriveStatus from "../helpers/watchDriveStatus";

import type { Car } from "../types/car";

export interface UseCarEngineReturn {
  carTrackRef: React.RefObject<HTMLDivElement | null>;
  carRef: React.RefObject<HTMLDivElement | null>;
  handleStart: () => Promise<void>;
  handleStop: () => Promise<void>;
  status: "idle" | "driving" | "broken";
}

const useCarEngine = (car: Car): UseCarEngineReturn => {
  const dispatch = useAppDispatch();
  const carTrackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation>(null);
  const status = useAppSelector(
    (state) => state.engine.carStatuses[car.id] ?? "idle",
  );
  const requestIdRef = useEngineCleanup(car.id, status, animationRef);

  const handleStart = async () => {
    if (status === "driving" || status === "broken") return;
    if (!carTrackRef.current || !carRef.current) return;
    requestIdRef.current += 1;
    const requestId = requestIdRef.current;
    const { velocity, distance } = await dispatch(startCar(car.id)).unwrap();
    if (requestId !== requestIdRef.current) return;

    const duration = distance / velocity;
    const animation = createDriveAnimation(
      carRef.current,
      carTrackRef.current,
      duration,
    );
    animationRef.current = animation;
    dispatch(setCarStatus({ id: car.id, status: "driving" }));

    watchDriveStatus(dispatch, car.id, animation, requestId, requestIdRef);
    animation.finished.then(() => dispatchFinishRace(dispatch, car, duration));
  };

  const handleStop = async () => {
    requestIdRef.current += 1;
    animationRef.current?.cancel();
    dispatch(setCarStatus({ id: car.id, status: "idle" }));
    await dispatch(stopCar(car.id));
  };
  useRaceCommandEffect(handleStart, handleStop);
  return { carTrackRef, carRef, handleStart, handleStop, status };
};

export default useCarEngine;
