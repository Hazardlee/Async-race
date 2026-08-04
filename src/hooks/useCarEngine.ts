import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCarStatus } from "../features/CarEngine/CarEngineSlice";
import { driveCar, startCar, stopCar } from "../features/CarEngine/thunk";
import finishRace from "../features/Race/thunk";

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
  const raceStatus = useAppSelector((state) => state.race.raceStatus ?? "idle");
  const requestIdRef = useRef(0);
  const isFirstRender = useRef(true);

  const statusRef = useRef(status);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(
    () => () => {
      requestIdRef.current += 1;
      animationRef.current?.cancel();
      if (statusRef.current === "broken" || statusRef.current === "driving") {
        dispatch(setCarStatus({ id: car.id, status: "idle" }));
      }
    },
    [car.id, dispatch],
  );

  const watchDriveStatus = async (animation: Animation, requestId: number) => {
    try {
      await dispatch(driveCar(car.id)).unwrap();
    } catch {
      if (requestId !== requestIdRef.current) return;
      animation.pause();
      dispatch(setCarStatus({ id: car.id, status: "broken" }));
    }
  };

  const handleStart = async () => {
    if (status === "driving" || status === "broken") return;
    if (!carTrackRef.current || !carRef.current) return;
    const requestId = ++requestIdRef.current;
    const { velocity, distance } = await dispatch(startCar(car.id)).unwrap();
    if (requestId !== requestIdRef.current) return;
    const duration = distance / velocity;

    const trackWidth =
      carTrackRef.current.clientWidth - carRef.current.clientWidth;

    const animation = carRef.current.animate(
      [
        { transform: "translateX(0px)" },
        { transform: `translateX(${trackWidth}px )` },
      ],
      {
        duration,
        fill: "forwards",
        easing: "linear",
      },
    );
    animationRef.current = animation;
    dispatch(setCarStatus({ id: car.id, status: "driving" }));

    watchDriveStatus(animation, requestId);

    animation.finished.then(() => {
      dispatch(
        finishRace({
          id: car.id,
          name: car.name,
          time: distance / velocity / 1000,
        }),
      );
    });
  };

  const handleStop = async () => {
    requestIdRef.current += 1;
    animationRef.current?.cancel();
    dispatch(setCarStatus({ id: car.id, status: "idle" }));
    await dispatch(stopCar(car.id));
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (raceStatus === "started") {
      handleStart();
    }
    if (raceStatus === "stopped") {
      handleStop();
    }
  }, [raceStatus]);

  return { carTrackRef, carRef, handleStart, handleStop, status };
};

export default useCarEngine;
