import { useEffect, useState } from "react";
import "./App.css";
import questionBank from "./model/questions.json";
import Keyboard from "./components/Keyboard";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { question, answer } = questions[currentQuestion] || {};

  const handleLetterClick = (letter) => {
    console.log(letter);
    if (answer === letter) {
      console.log("correct!");
      setCurrentQuestion((q) => q + 1);
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

  return (
    <>
      <h1>
        {question}, {answer}
      </h1>
      <ul>
        {questions.map((q, i) => (
          <li key={i}>{i === currentQuestion ? `${q.emoji} ${q.question}` : i + 1}</li>
        ))}
      </ul>
      <Keyboard answer={answer} handleLetterClick={handleLetterClick} />
    </>
  );
};

export default App;
