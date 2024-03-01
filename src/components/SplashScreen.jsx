import { useGameDispatch } from "./GameContext";

const SplashScreen = () => {
  const dispatch = useGameDispatch();
  return (
    <>
      <div className="splash-container">
        <div className="logo-title splash-title">
          Letter
          <br />
          Quest
        </div>
        <button className="begin-button" onClick={() => dispatch({ type: "start_new_game" })}>
          Begin Game
        </button>
      </div>
    </>
  );
};

export default SplashScreen;
