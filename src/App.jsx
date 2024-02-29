import "./App.css";
import Game from "./components/Game";
import { useGameState } from "./components/GameContext";
import ResultsScreen from "./components/ResultsScreen";
import SplashScreen from "./components/SplashScreen";

const App = () => {
  const state = useGameState();

  console.log(state);
  return (
    <>
      {state.gameStatus === 0 && <SplashScreen />}
      {state.gameStatus === 1 && <Game />}
      {state.gameStatus === 2 && <ResultsScreen />}
    </>
  );
};

export default App;
