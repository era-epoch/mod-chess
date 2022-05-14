import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uid } from "react-uid";
import { RootState } from "../state/rootReducer";
import { makeMove, selectSquare } from "../state/slices/gameSlice";
import { SquareStatus } from "../types";
import "./Board.css";
import Square from "./Square";

const Board = (): JSX.Element => {
  // let gameState = initialGameState;
  const gameState = useSelector((state: RootState) => state.game.board)
  const turn = useSelector((state: RootState) => state.game.turn);
  const dispatch = useDispatch();

  const handleMove = (row: number, col: number) => {
    // console.log('Handling Move');
    dispatch(makeMove({row: row, col: col}));
  }

  const handleSelect = (row: number, col: number) => {
    // console.log('Square Selected');
    dispatch(selectSquare({row: row, col: col}));
  }

  const handleSquareClick = (row: number, col: number) => {
    const madeMove = gameState[row][col].squareStatuses.has(SquareStatus.HL) 
      || gameState[row][col].squareStatuses.has(SquareStatus.HLC)
      || gameState[row][col].squareStatuses.has(SquareStatus.HLK);
    if (madeMove) {
      handleMove(row, col);
    } else {
      handleSelect(row, col);
    }
  }

  return (
    <div className="Board">
      {gameState.map((row, rowN) => {
        return (
          <div className="row">
          {row.map((val, colN) => {
            return <Square 
            key={uid(val)}
            row={rowN} 
            col={colN} 
            content={val}
            clickHandler={handleSquareClick} />
          })}
          </div>
        )
      })}
    </div>
  );
}

export default Board;
