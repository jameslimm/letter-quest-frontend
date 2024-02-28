import { useEffect, useState } from "react";

const Keyboard = ({ answer, handleLetterClick }) => {
  const KEYS = ["qwertyuiop".split(""), "asdfghjkl".split(""), "zxcvbnm".split("")];
  const MAX_HINT_LEVEL = 3;

  const [hintLevel, setHintLevel] = useState(0);
  const [activeKeys, setActiveKeys] = useState([]);

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
  }, [answer]);

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
          <div
            className="keyboard-key"
            onClick={() => setHintLevel(hintLevel < MAX_HINT_LEVEL ? hintLevel + 1 : hintLevel)}
          >
            Give me a hint
          </div>
        </div>
      )}
    </div>
  );
};

export default Keyboard;
