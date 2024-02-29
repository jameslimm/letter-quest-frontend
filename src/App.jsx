import { useEffect, useState } from "react";
import "./App.css";
import questionBank from "./model/questions.json";
import Keyboard from "./components/Keyboard";
import GameStartAnimation from "./components/GameStartAnimation";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [startTime, setStartTime] = useState(new Date().getTime());
  const [currentTime, setCurrentTime] = useState(0);
  const [penalty, setPenalty] = useState(0);

  const { question, answer, emoji } = questions[currentQuestion] || {};

  const getWindowDimensions = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  useEffect(() => {
    const intervalId = setTimeout(() => setCurrentTime(new Date().getTime() - startTime), 100);
    return () => clearTimeout(intervalId);
  }, [currentTime, startTime]);

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowDimensions(getWindowDimensions);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleLetterClick = (letter) => {
    console.log(letter);
    if (answer === letter) {
      console.log("correct!");
      setCurrentQuestion((q) => q + 1);
    } else {
      console.log("wrong");
      handleAddPenalty(1);
    }
  };

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
    setQuestions(_qB);
  };

  useEffect(() => {
    chooseQuestions();
  }, []);

  const handleAddPenalty = (seconds) => {
    setPenalty(penalty + seconds);
  };

  const questionHeightandWidth = Math.round(windowDimensions.width * 0.25);
  // calculate the amount to transform the question slider div
  // in order to centralise the current question.
  // assume that each question box is 300px wide.

  const centralWindowX = windowDimensions.width / 2;
  const centralQuestionX = Math.round(
    currentQuestion * questionHeightandWidth + questionHeightandWidth / 2
  );

  const amountToTransform = centralWindowX - centralQuestionX;
  const sliderStyle = {
    transform: `translateX(${amountToTransform}px)`,
  };

  console.log(sliderStyle);

  return (
    <>
      {/* <GameStartAnimation /> */}
      <h3>
        {(currentTime / 1000).toFixed(1)} + {penalty}
      </h3>
      <div
        className="question-slider"
        style={{
          height: `${questionHeightandWidth}px`,
        }}
      >
        {questions.map((q, i) => {
          const questionStyle = {
            transform: `translateX(${amountToTransform}px)`,
            left: `${i * questionHeightandWidth}px`,
            width: `${questionHeightandWidth}px`,
            height: `${questionHeightandWidth}px`,
          };
          const questionEmojiStyle = {
            minWidth: `${questionHeightandWidth - 75}px`,
            minHeight: `${questionHeightandWidth - 75}px`,
          };
          return (
            <div className="question" key={i} style={questionStyle}>
              <div className="question-emoji" style={questionEmojiStyle}>
                {i <= currentQuestion ? q.emoji : i + 1}
              </div>
              <div className="question-word">
                {i === currentQuestion
                  ? q.question.toUpperCase()
                  : i > currentQuestion
                  ? "___"
                  : q.word.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
      <Keyboard
        answer={answer}
        question={question}
        handleLetterClick={handleLetterClick}
        handleAddPenalty={handleAddPenalty}
      />
    </>
  );
};

export default App;
