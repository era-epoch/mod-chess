import "./App.css";
import GameArea from "./Components/GameArea";
import LeftBar from "./Components/LeftBar";

function App(): JSX.Element {
  return (
    <div className="App">
      <LeftBar />
      <GameArea />
    </div>
  );
}

export default App;
