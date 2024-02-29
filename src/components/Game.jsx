import { useEffect } from "react";
import { useGameDispatch } from "./GameContext";

import questionBank from "../model/questions.json";

import Keyboard from "./Keyboard";
import QuestionSlider from "./QuestionSlider";

const Game = () => {
  const dispatch = useGameDispatch();

  // const [currentTime, setCurrentTime] = useState(0);
  // useEffect(() => {
  //   const intervalId = setTimeout(() => setCurrentTime(new Date().getTime() - startTime), 100);
  //   return () => clearTimeout(intervalId);
  // }, [currentTime, startTime]);

  const chooseQuestions = (maxWordLength = 4) => {
    const _qB = questionBank.filter((q) => q.word.length < maxWordLength);
    _qB.sort((a, b) => (Math.random() < 0.5 ? -1 : 1));
    _qB.splice(0, _qB.length - 10);

    _qB.forEach((_q) => {
      const wordArr = _q.word.split("");
      const letterIdx = Math.floor(Math.random() * wordArr.length);

      _q.answer = wordArr[letterIdx];
      wordArr[letterIdx] = "_";
      _q.question = wordArr.join("");
    });
    dispatch({ type: "set_questions", questions: _qB });
  };

  useEffect(() => {
    chooseQuestions();
  }, []);

  return (
    <>
      <QuestionSlider />
      <Keyboard />
    </>
  );
};

export default Game;
