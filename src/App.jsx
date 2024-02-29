import "./App.css";
import Game from "./components/Game";
import { GameProvider } from "./components/GameContext";

const App = () => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
};

export default App;
