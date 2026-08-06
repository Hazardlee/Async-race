const createDriveAnimation = (
  car: HTMLElement,
  track: HTMLElement,
  duration: number,
): Animation => {
  const trackWidth = track.clientWidth - car.clientWidth;
  return car.animate(
    [
      { transform: "translateX(0px)" },
      { transform: `translateX(${trackWidth}px)` },
    ],
    { duration, fill: "forwards", easing: "linear" },
  );
};

export default createDriveAnimation;
