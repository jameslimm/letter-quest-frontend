import { useEffect, useState } from "react";
import Keyboard from "./Keyboard";
import { useGameDispatch, useGameState } from "./GameContext";

const ScoreSave = () => {
  const API_ENDPOINT = "http://localhost:5000/results";
  const [nickNameEdit, setNickNameEdit] = useState(["", "", ""]);

  const [editingIndex, setEditingIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(true);

  const dispatch = useGameDispatch();
  const { nickName, score } = useGameState();

  const saveScore = async () => {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gametime: score, nickname: nickName }),
    };

    try {
      const response = await fetch(API_ENDPOINT, postOptions);
      if (!response.ok) throw Error("Save failed.");
    } catch (e) {
      console.log(e);
    } finally {
      // something here
    }

    console.log(nickName, score);
  };

  useEffect(() => {
    if (nickName !== "") {
      setIsEditing(false);
      saveScore();
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

  if (!isEditing) {
    return (
      <>
        <h3>Well done {nickName}, you got a score of ....</h3>
      </>
    );
  }

  if (isEditing) {
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
