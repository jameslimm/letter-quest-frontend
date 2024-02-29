import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GameProvider } from "./components/GameContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GameProvider>
    <App />
  </GameProvider>
);
