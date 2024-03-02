import { useEffect, useState } from "react";
import { useGameState } from "./GameContext";
import { getHighScores } from "../modules/api";

const HighScoreTable = () => {
  const MAX_HIGH_SCORES = 20;

  const [highScores, setHighScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { nickName, score } = useGameState();

  useEffect(() => {
    (async () => {
      const highScores = await getHighScores();
      if (highScores.data) setHighScores(highScores.data);
      if (highScores.error) setIsError(true);
      setIsLoading(false);
    })();
  }, []);

  // add the nickname and score to the list of high scores to be shown.
  const highScoresView =
    highScores && highScores.length > 0
      ? [...highScores, { gametime: score, nickname: nickName, isNew: true }]
      : [];
  highScoresView.sort((a, b) => a.gametime - b.gametime);
  highScoresView.splice(0, highScoresView.length - MAX_HIGH_SCORES);

  return (
    <div className="high-scores">
      <h3>High Scores</h3>
      <p>Lowest time wins!</p>
      {isLoading && (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {isError && <p>Error Loading Data.</p>}
      {highScoresView &&
        highScoresView.map((hs, i) => {
          const _class = hs.isNew ? "high-score-line-new" : "high-score-line";
          return (
            <div key={i} className={_class}>
              <div className="high-score-line-position">{i + 1}</div>
              <div className="high-score-line-nickname">{hs.nickname || "New Score"}</div>
              <div className="high-score-line-gametime">{(hs.gametime / 1000).toFixed(2)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default HighScoreTable;
