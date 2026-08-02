import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { driveCar, startCar, stopCar } from "../features/CarEngine/thunk";
import type { Car } from "../types/car";
import { setCarStatus } from "../features/CarEngine/CarEngineSlice";

const useCarEngine = (car: Car) => {
  const dispatch = useAppDispatch();
  const carTrackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation>(null);
  const status = useAppSelector((state) => state.engine.carStatuses[car.id] ?? 'idle')

  useEffect(() => {
    return () => {
      animationRef.current?.cancel();
      if (status === 'broken' || status === 'driving') {
        dispatch(setCarStatus({id: car.id, status: 'idle'}))
      }
    }
  }, [car.id])

  const handleStart = async () => {
    const { velocity, distance } = await dispatch(startCar(car.id)).unwrap();
    const duration = distance / velocity;

    const trackWidth =
    carTrackRef.current!.clientWidth - carRef.current!.clientWidth;

    const animation = carRef.current!.animate(
      [{ transform: "translateX(0px)" }, { transform: `translateX(${trackWidth}px )` }],
      {
        duration: duration,
        fill: "forwards",
        easing: "linear",
      },
    );
    animationRef.current = animation;
    dispatch(setCarStatus({ id: car.id, status: "driving" }));

    try {
      await dispatch(driveCar(car.id)).unwrap();
    } catch {
      animation.pause();
      dispatch(setCarStatus({ id: car.id, status: "broken" }));
    }
  };

  const handleStop = async () => {
    await dispatch(stopCar(car.id));
    animationRef.current?.cancel();
    dispatch(setCarStatus({ id: car.id, status: "idle" }));
  };

  return { carTrackRef, carRef, handleStart, handleStop, status };
};

export default useCarEngine;
