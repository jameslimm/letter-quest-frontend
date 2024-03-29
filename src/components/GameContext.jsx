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
        penaltyTime: state.penaltyTime + action.penalty,
      };
    case "set_game_status":
      return {
        ...state,
        gameStatus: action.gameStatus,
      };
    case "start_new_game":
      return {
        ...state,
        currentQuestion: 0,
        gameStatus: 1,
        startTime: new Date().getTime(),
        endTime: 0,
        penaltyTime: 0,
      };
    case "end_game":
      return {
        ...state,
        gameStatus: 2,
        endTime: new Date().getTime(),
      };
    case "set_nickname":
      return {
        ...state,
        nickName: action.nickName,
      };
  }
};

const initialData = {
  gameStatus: 0,
  questions: [],
  currentQuestion: 0,
  totalQuestions: 10,
  startTime: 0,
  endTime: 0,
  penaltyTime: 0,
  nickName: "",
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  state.score = state.endTime > 0 ? state.endTime - state.startTime + state.penaltyTime * 1000 : 0;

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>{children}</GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
export const useGameDispatch = () => useContext(GameDispatchContext);
