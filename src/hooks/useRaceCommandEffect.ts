import { useEffect, useRef } from "react";

import { useAppSelector } from "../app/hooks";

const useRaceCommandEffect = (
  onStart: () => void,
  onStop: () => void,
): void => {
  const raceStatus = useAppSelector((state) => state.race.raceStatus ?? "idle");
  const commandId = useAppSelector((state) => state.race.commandId ?? 0);
  const isFirstRender = useRef(true);

  const onStartRef = useRef(onStart);
  const onStopRef = useRef(onStop);

  useEffect(() => {
    onStartRef.current = onStart;
    onStopRef.current = onStop;
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (raceStatus === "started") onStartRef.current();
    if (raceStatus === "stopped") onStopRef.current();
  }, [commandId, raceStatus]);
};

export default useRaceCommandEffect;
