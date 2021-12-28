import Board from "./Board";
import "./GameArea.css";

function GameArea(): JSX.Element {
  return (
    <div className="GameArea">
      <Board />
    </div>
  );
}

export default GameArea;
