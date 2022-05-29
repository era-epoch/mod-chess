import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uid } from 'react-uid';
import { RootState } from '../state/rootReducer';
import { makeMove, selectSquare } from '../state/slices/game/slice';
import { SquareStatus } from '../types';
import './Board.css';
import Square from './Square';

const Board = (): JSX.Element => {
  const gameState = useSelector((state: RootState) => state.game.board);
  // const socket = useSelector((state: RootState) => state.connection.socket);
  const dispatch = useDispatch();

  const handleMove = (row: number, col: number) => {
    dispatch(makeMove({ row: row, col: col }));
  };

  const handleSelect = (row: number, col: number) => {
    dispatch(selectSquare({ row: row, col: col }));
  };

  const handleSquareClick = (row: number, col: number) => {
    const madeMove =
      gameState[row][col].squareStatuses.includes(SquareStatus.HL) ||
      gameState[row][col].squareStatuses.includes(SquareStatus.HLC) ||
      gameState[row][col].squareStatuses.includes(SquareStatus.HLK);
    if (madeMove) {
      handleMove(row, col);
    } else {
      handleSelect(row, col);
    }
  };

  return (
    <div className="Board">
      {gameState.map((row, rowN) => {
        return (
          <div key={uid(rowN)} className="row">
            {row.map((val, colN) => {
              return <Square key={uid(val)} row={rowN} col={colN} content={val} clickHandler={handleSquareClick} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
