import { useGameState } from "./GameContext";
import HighScoreTable from "./HighScoreTable";

const ResultsScreen = () => {
  const { startTime, endTime, penaltyTime } = useGameState();
  const resultsTime = (endTime - startTime) / 1000 + penaltyTime;

  return (
    <>
      <div className="results-container">
        <h1 className="logo-title">Letter Quest</h1>

        <h2>Results</h2>
        <p>
          You completed the game in {resultsTime} seconds! (Including {penaltyTime} penalty seconds)
        </p>
        <HighScoreTable />
      </div>
    </>
  );
};

export default ResultsScreen;
