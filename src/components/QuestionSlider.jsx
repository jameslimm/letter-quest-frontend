import { useGameState } from "./GameContext";
import Question from "./Question";

const QuestionSlider = () => {
  const state = useGameState();

  return (
    <div className="question-slider">
      {state.questions.map((_, i) => (
        <Question questionIndex={i} key={i} />
      ))}
    </div>
  );
};

export default QuestionSlider;
