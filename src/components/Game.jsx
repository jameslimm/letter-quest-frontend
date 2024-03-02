import { useEffect } from "react";
import { useGameDispatch, useGameState } from "./GameContext";

import { chooseQuestions } from "../modules/utils";

import QuestionSlider from "./QuestionSlider";
import Timer from "./Timer";
import GameKeyboard from "./GameKeyboard";

const Game = () => {
  const dispatch = useGameDispatch();
  const { totalQuestions } = useGameState();
  const MAX_WORD_LENGTH = 6;

  useEffect(() => {
    dispatch({
      type: "set_questions",
      questions: chooseQuestions(totalQuestions, MAX_WORD_LENGTH),
    });
  }, []);

  return (
    <>
      <main>
        <div className="game-header">
          <Timer />
          <h1 class="logo-title">Letter Quest</h1>
          <button onClick={() => dispatch({ type: "set_game_status", gameStatus: 0 })}>
            Go Back
          </button>
        </div>
        <QuestionSlider />
        <GameKeyboard />
      </main>
    </>
  );
};

export default Game;
