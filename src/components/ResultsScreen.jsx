import { useGameDispatch, useGameState } from "./GameContext";
import HighScoreTable from "./HighScoreTable";
import ScoreSave from "./ScoreSave";

const ResultsScreen = () => {
  const { startTime, endTime, penaltyTime } = useGameState();
  const resultsTime = (endTime - startTime) / 1000 + penaltyTime;
  const dispatch = useGameDispatch();
  return (
    <>
      <div className="results-container">
        <h1 className="logo-title">Letter Quest</h1>

        <ScoreSave />
        <h2>Results</h2>
        <p>
          You completed the game in {resultsTime} seconds! (Including {penaltyTime} penalty seconds)
        </p>
        <button className="begin-button" onClick={() => dispatch({ type: "start_new_game" })}>
          Start New Game
        </button>

        <HighScoreTable />
      </div>
    </>
  );
};

export default ResultsScreen;
