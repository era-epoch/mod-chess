import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uid } from 'react-uid';
import { wsEmitMove } from '../socketMiddleware';
import { RootState } from '../state/rootReducer';
import { makeMove, selectSquare } from '../state/slices/game/slice';
import { store } from '../state/store';
import { SquareStatus } from '../types';
import './Board.css';
import Square from './Square';

const Board = (): JSX.Element => {
  const gameState = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const handleMove = (row: number, col: number) => {
    dispatch(makeMove({ row: row, col: col }));
    const newGameState = store.getState().game;
    dispatch(wsEmitMove(newGameState));
  };

  const handleSelect = (row: number, col: number) => {
    dispatch(selectSquare({ row: row, col: col }));
  };

  const handleSquareClick = (row: number, col: number) => {
    const madeMove =
      gameState.board[row][col].squareStatuses.includes(SquareStatus.HL) ||
      gameState.board[row][col].squareStatuses.includes(SquareStatus.HLC) ||
      gameState.board[row][col].squareStatuses.includes(SquareStatus.HLK);
    if (madeMove) {
      handleMove(row, col);
    } else {
      handleSelect(row, col);
    }
  };

  return (
    <div className="Board">
      {gameState.board.map((row, rowN) => {
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
