import { useEffect, useState } from "react";
import { useGameState } from "./GameContext";

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const { startTime, penaltyTime } = useGameState();

  useEffect(() => {
    const intervalId = setTimeout(() => setCurrentTime(new Date().getTime()), 100);
    return () => clearTimeout(intervalId);
  }, [currentTime]);

  console.log(currentTime, startTime);
  const resultsTime = (currentTime - startTime) / 1000 + penaltyTime;

  return <div className="stopwatch">{resultsTime.toFixed(2)}</div>;
};

export default Timer;
