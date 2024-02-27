import Emoji from "./Emoji";
import questions from "../model/questions.json";
import { useState } from "react";

const GameInterface = () => {
  const startNewGame = () => {
    const randomQuestions = questions.toSorted((a, b) => (Math.random() < 0.5 ? 1 : -1));
    const questionData = randomQuestions.filter((q) => q.word.length < 4);

    const totalQuestions = Math.min(10, questionData.length);

    questionData.splice(0, questionData.length - totalQuestions);

    return {
      currentQuestion: 0,
      totalQuestions,
      questionData,
    };
  };

  const [gameData, setGameData] = useState(startNewGame());

  return (
    <div className="emoji-slider">
      {gameData && gameData.questionData && gameData.questionData.map((qD) => <Emoji qData={qD} />)}
    </div>
  );
};

export default GameInterface;
