import { useEffect, useState } from "react";
import { useGameDispatch, useGameState } from "./GameContext";

const Keyboard = () => {
  const KEYS = ["qwertyuiop".split(""), "asdfghjkl".split(""), "zxcvbnm".split("")];
  const MAX_HINT_LEVEL = 3;

  const { currentQuestion, questions, totalQuestions } = useGameState();
  const { question, answer } = questions[currentQuestion] || {};

  const dispatch = useGameDispatch();

  const [hintLevel, setHintLevel] = useState(0);
  const [activeKeys, setActiveKeys] = useState([]);

  const giveAHint = () => {
    if (hintLevel >= MAX_HINT_LEVEL) return;
    setHintLevel(hintLevel + 1);
    handleAddPenalty(2);
  };

  const handleLetterClick = (letter) => {
    if (answer === letter) {
      if (currentQuestion === totalQuestions - 1) {
        dispatch({ type: "end_game" });
        return;
      }
      dispatch({ type: "set_current_question", currentQuestion: currentQuestion + 1 });
    } else {
      dispatch({ type: "add_penalty", penalty: 1 });
    }
  };

  const handleAddPenalty = (seconds) => {
    dispatch({ type: "add_penalty", penalty: seconds });
  };

  useEffect(() => {
    // RUN WHEN THE ANSWER PROP CHANGES (i.e moving to a new question)
    // create a flat array of keyboard keys, then remove the
    // correct answer and randomise the order.
    const allKeys = KEYS.flat()
      .filter((l) => l !== answer)
      .sort((a, b) => (Math.random() < 0.5 ? -1 : 1));

    // add the correct answer letter back to the start of the array
    allKeys.unshift(answer);

    // reset the hint level back to 0 (all keys shown)
    setHintLevel(0);

    // create array of hint levels - with progressively
    // fewer keys being shown (but always the correct letter)
    setActiveKeys([
      allKeys,
      [...allKeys.slice(0, 15)],
      [...allKeys.slice(0, 8)],
      [...allKeys.slice(0, 3)],
    ]);
  }, [answer, question]);

  return (
    <div className="keyboard">
      {KEYS.map((row, i) => {
        const rowKeys = row.map((k) => {
          return (
            <div
              className={
                activeKeys[hintLevel]?.includes(k) ? "keyboard-key" : "keyboard-key-inactive"
              }
              key={k}
              role="button"
              tabIndex={0}
              onClick={() => handleLetterClick(k)}
            >
              {k.toUpperCase()}
            </div>
          );
        });
        return (
          <div className="keyboard-row" key={i}>
            {rowKeys}
          </div>
        );
      })}
      {hintLevel < MAX_HINT_LEVEL && (
        <div className="keyboard-row">
          <div className="keyboard-key keyboard-hint" onClick={giveAHint}>
            Give me a hint
          </div>
        </div>
      )}
    </div>
  );
};

export default Keyboard;
