import { useLayoutEffect, useRef, useState } from "react";
import { useGameState } from "./GameContext";

const Question = ({ questionIndex }) => {
  const { currentQuestion, questions } = useGameState();
  const { emoji, word, question } = questions[questionIndex];

  const questionRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [questionWidth, setQuestionWidth] = useState(0);

  useLayoutEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      if (questionRef.current) {
        console.log(questionRef.current.getBoundingClientRect().width);
        setQuestionWidth(questionRef.current.getBoundingClientRect().width);
      }
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const centralQuestionX = Math.round(currentQuestion * questionWidth + questionWidth / 2);
  const amountToTransform = windowWidth / 2 - centralQuestionX;

  const questionStyle = {
    transform: `translateX(${amountToTransform}px)`,
    left: `${questionIndex * questionWidth}px`,
  };

  return (
    <div className="question" ref={questionRef} style={questionStyle}>
      <div className="question-emoji">
        {questionIndex <= currentQuestion ? emoji : questionIndex + 1}
      </div>
      <div className="question-word">
        {questionIndex === currentQuestion
          ? question.toUpperCase()
          : questionIndex > currentQuestion
          ? "___"
          : word.toUpperCase()}
      </div>
    </div>
  );
};

export default Question;
