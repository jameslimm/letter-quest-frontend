import { useGameState } from "./GameContext";

const ResultsScreen = () => {
  const { startTime, endTime, penaltyTime } = useGameState();
  const resultsTime = (endTime - startTime) / 1000 + penaltyTime;

  return (
    <>
      <h1>Results</h1>
      <p>
        You completed the game in {resultsTime} seconds! (Including {penaltyTime} penalty seconds)
      </p>
    </>
  );
};

export default ResultsScreen;
