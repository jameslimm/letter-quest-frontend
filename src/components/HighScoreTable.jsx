import { useEffect, useState } from "react";
import { useGameState } from "./GameContext";

const HighScoreTable = () => {
  const API_ENDPOINT = "http://localhost:5000/results";

  const [highScores, setHighScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { nickName, score } = useGameState();

  useEffect(() => {
    // do a fetch call to the server to get the high scores
    const getResults = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const results = await fetch(API_ENDPOINT);
        const data = await results.json();
        setHighScores(data);
      } catch (e) {
        setIsError(true);
      } finally {
        // do something in all cases
        setIsLoading(false);
      }
    };
    getResults();
  }, []);

  useEffect(() => {
    // is this game result included in the results from the server?
    console.log("HERE");
    const resIndex = highScores.findIndex(
      (hs) => hs.gametime === score && hs.nickname === nickName
    );
    if (resIndex !== -1) {
      console.log("found it");
      return;
    }

    const _highScores = [...highScores, { id: -1, gametime: score, nickname: nickName }];
    _highScores.sort((a, b) => a.gametime - b.gametime);
    _highScores.splice(0, _highScores.length - 10);

    setHighScores(_highScores);
  }, [highScores, nickName, score]);

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
      {highScores &&
        highScores.map((hs, i) => {
          const isThisGame = hs.gametime === score && hs.nickname === nickName;
          const _class = isThisGame ? "high-score-line-new" : "high-score-line";
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
