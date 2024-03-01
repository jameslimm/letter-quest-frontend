import { useEffect, useState } from "react";

const dummyData = [
  {
    id: 1,
    timestamp: "2024-03-01T09:09:24.000Z",
    gametime: 11125,
    nickname: "JAM",
  },
  {
    id: 2,
    timestamp: "2024-03-01T09:17:55.000Z",
    gametime: 12000,
    nickname: "JEL",
  },
];
const HighScoreTable = () => {
  const [highScores, setHighScores] = useState(dummyData);

  useEffect(() => {
    // do a fetch call to the server to get the high scores
  }, []);

  return (
    <div className="high-scores">
      <h3>High Scores</h3>
      <p>Lowest time wins!</p>
      {highScores.map((hs, i) => (
        <div key={hs.id} className="high-score-line">
          <div className="high-score-line-position">{i + 1}</div>
          <div className="high-score-line-nickname">{hs.nickname}</div>
          <div className="high-score-line-gametime">{(hs.gametime / 1000).toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default HighScoreTable;
