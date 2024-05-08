import { useCallback, useEffect, useRef } from "react";

const Keyboard = (props) => {
  const keysRef = useRef([]);

  const KEYS = ["qwertyuiop".split(""), "asdfghjkl".split(""), "zxcvbnm".split("")];
  const qwerty = KEYS.flat();

  const { handleLetterClick, activeKeys = qwerty, handleGiveAHint } = props;

  // function to set the focus to a certain key in the keyboard.
  const setKeyFocus = useCallback((key) => {
    if (key in keysRef.current) {
      keysRef.current[key].focus();
    }
  }, []);

  // set up an event listener to intercept key presses.
  useEffect(() => {
    const handleKeyPress = (e) => {
      const lowerCaseKey = e.key?.toLowerCase() || "";

      // if a letter has been pressed....
      if (qwerty.includes(lowerCaseKey)) {
        setKeyFocus(lowerCaseKey);
        handleLetterClick(lowerCaseKey);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleLetterClick, setKeyFocus, qwerty]);

  // if activekeys changes, check that a letter still has focus... if not,
  // set focus to the first active letter on the keyboard.
  useEffect(() => {
    // if a key still has focus (i.e. hasn't been disabled, don't do anything)
    if (Object.values(keysRef.current).some((el) => document.activeElement === el)) return;

    // otherwise, find the first key on the keyboard that's still active and set the focus
    const letterToFocus = qwerty.reduceRight((letter, cur) =>
      activeKeys.includes(cur) ? cur : letter ?? null
    );

    setKeyFocus(letterToFocus);
  }, [activeKeys, keysRef, qwerty, setKeyFocus]);

  return (
    <div className="keyboard">
      {KEYS.map((row, i) => {
        const rowKeys = row.map((k) => {
          return (
            <button
              ref={(el) => (keysRef.current[k] = el)}
              className={activeKeys?.includes(k) ? "keyboard-key" : "keyboard-key-inactive"}
              key={k}
              disabled={!activeKeys?.includes(k)}
              onClick={() => handleLetterClick(k)}
            >
              {k.toUpperCase()}
            </button>
          );
        });
        return (
          <div className="keyboard-row" key={i}>
            {rowKeys}
          </div>
        );
      })}
      {handleGiveAHint && (
        <div className="keyboard-row">
          <button className="keyboard-key keyboard-hint" onClick={handleGiveAHint}>
            Give me a hint
          </button>
        </div>
      )}
    </div>
  );
};

export default Keyboard;
