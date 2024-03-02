import { useEffect, useState } from "react";
import Keyboard from "./Keyboard";
import { useGameDispatch, useGameState } from "./GameContext";
import { saveScore } from "../modules/api";

const ScoreSave = () => {
  const [nickNameEdit, setNickNameEdit] = useState(["", "", ""]);
  const [editingIndex, setEditingIndex] = useState(0);

  const dispatch = useGameDispatch();

  const { nickName, score } = useGameState();

  useEffect(() => {
    if (nickName !== "") {
      saveScore(score, nickName);
    }
  }, [nickName]);

  const handleLetterClick = (k) => {
    const _nickName = nickNameEdit.map((letter, i) =>
      i === editingIndex ? k.toUpperCase() : letter
    );
    setNickNameEdit(_nickName);
    setEditingIndex(editingIndex < 2 ? editingIndex + 1 : editingIndex);

    // have all three letters been selected?  Then save it!
    if (_nickName.every((letter) => letter !== "")) {
      dispatch({ type: "set_nickname", nickName: _nickName.join("") });
    }
  };

  if (nickName === "") {
    return (
      <>
        <h2>Save Your Score</h2>
        <p>Enter a three letter nickname.</p>
        <div className="enter-nickname">
          {nickNameEdit.map((letter, i) => {
            const _class = editingIndex === i ? "letter-editing" : "letter";
            return (
              <div key={i} onClick={() => setEditingIndex(i)} className={_class}>
                {letter || "_"}
              </div>
            );
          })}
        </div>
        <Keyboard handleLetterClick={handleLetterClick} />
      </>
    );
  }
};

export default ScoreSave;
