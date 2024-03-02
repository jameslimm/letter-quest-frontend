import { useGameDispatch, useGameState } from "./GameContext";
import HighScoreTable from "./HighScoreTable";
import ScoreSave from "./ScoreSave";

const ResultsScreen = () => {
  const { nickName, score, penaltyTime } = useGameState();
  const dispatch = useGameDispatch();
  return (
    <>
      <main>
        <h1 className="logo-title">Letter Quest</h1>

        <div className="results_summary">
          <h2>Well Done {nickName !== "" ? nickName : "Player"}!</h2>
          <p>
            You completed the game in {(score / 1000).toFixed(2)} seconds (including {penaltyTime}{" "}
            penalty seconds.)
          </p>
        </div>

        <ScoreSave />

        <button className="begin-button" onClick={() => dispatch({ type: "start_new_game" })}>
          Start New Game
        </button>

        <HighScoreTable />
      </main>
    </>
  );
};

export default ResultsScreen;
