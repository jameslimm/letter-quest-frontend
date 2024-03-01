import { useEffect } from "react";
import { useGameDispatch, useGameState } from "./GameContext";

import { chooseQuestions } from "../model/utils";

import Keyboard from "./Keyboard";
import QuestionSlider from "./QuestionSlider";
import Timer from "./Timer";

const Game = () => {
  const dispatch = useGameDispatch();
  const { totalQuestions } = useGameState();
  const MAX_WORD_LENGTH = 4;

  useEffect(() => {
    dispatch({
      type: "set_questions",
      questions: chooseQuestions(totalQuestions, MAX_WORD_LENGTH),
    });
  }, []);

  return (
    <>
      <div className="game-header">
        <Timer />
        <h1 class="logo-title">Letter Quest</h1>
        <button onClick={() => dispatch({ type: "set_game_status", gameStatus: 0 })}>
          Go Back
        </button>
      </div>
      <QuestionSlider />
      <Keyboard />
    </>
  );
};

export default Game;
