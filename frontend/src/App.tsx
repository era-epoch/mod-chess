import React from "react";
import "./App.css";
import GameArea from "./Components/GameArea";
import LeftBar from "./Components/LeftBar";
import RightBar from "./Components/RightBar";

function App(): JSX.Element {
  return (
    <div className="App">
      <LeftBar />
      <GameArea />
      <RightBar />
    </div>
  );
}

export default App;
