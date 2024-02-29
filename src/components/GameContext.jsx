import { createContext, useContext, useReducer } from "react";

export const GameStateContext = createContext(null);
export const GameDispatchContext = createContext(null);

const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "set_questions":
      return {
        ...state,
        questions: action.questions,
      };
    case "set_current_question":
      return {
        ...state,
        currentQuestion: action.currentQuestion,
      };
    case "add_penalty":
      return {
        ...state,
        penalty: state.penalty + action.penalty,
      };
  }
};

const initialData = {
  questions: [],
  currentQuestion: 0,
  startTime: new Date().getTime(),
  currentTime: 0,
  penaltyTime: 0,
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>{children}</GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
export const useGameDispatch = () => useContext(GameDispatchContext);
