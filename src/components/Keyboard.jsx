const Keyboard = ({
  handleLetterClick,
  activeKeys = "qwertyuiopasdfghjklzxcvbnm".split(""),
  handleGiveAHint,
}) => {
  const KEYS = ["qwertyuiop".split(""), "asdfghjkl".split(""), "zxcvbnm".split("")];
  return (
    <div className="keyboard">
      {KEYS.map((row, i) => {
        const rowKeys = row.map((k) => {
          return (
            <div
              className={activeKeys?.includes(k) ? "keyboard-key" : "keyboard-key-inactive"}
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
      {handleGiveAHint && (
        <div className="keyboard-row">
          <div className="keyboard-key keyboard-hint" onClick={handleGiveAHint}>
            Give me a hint
          </div>
        </div>
      )}
    </div>
  );
};

export default Keyboard;
