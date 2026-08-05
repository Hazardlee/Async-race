import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsCarRacing } from "../features/CarEngine/CarEngineSlice";
import { setRaceStatus, setRaceWinner } from "../features/Race/raceSlice";

import type { RaceWinner } from "../types/winners";

interface UseRaceStatusResult {
  winner: RaceWinner | null;
  isRacing: boolean;
  resetWinner: () => void;
}

const useRaceStatus = (): UseRaceStatusResult => {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector((state) => state.race.raceStatus);
  const isAnyCarRacing = useAppSelector(selectIsCarRacing);
  const winner = useAppSelector((state) => state.race.raceWinner);

  const isRacing = raceStatus === "started" || isAnyCarRacing;

  useEffect(
    () => () => {
      dispatch(setRaceStatus("idle"));
    },
    [dispatch],
  );

  const resetWinner = () => dispatch(setRaceWinner(null));

  return {
    winner,
    isRacing,
    resetWinner,
  };
};

export default useRaceStatus;
