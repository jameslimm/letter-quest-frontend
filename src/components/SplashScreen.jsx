import { useGameDispatch } from "./GameContext";

const SplashScreen = () => {
  const dispatch = useGameDispatch();
  return (
    <>
      <h1>Welcome!</h1>
      <button onClick={() => dispatch({ type: "start_new_game" })}>Begin Game</button>
    </>
  );
};

export default SplashScreen;
