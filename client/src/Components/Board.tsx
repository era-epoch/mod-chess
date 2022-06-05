import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uid } from 'react-uid';
import { wsEmitMove } from '../socketMiddleware';
import { RootState } from '../state/rootReducer';
import { makeMove, selectSquare } from '../state/slices/game/slice';
import { store } from '../state/store';
import { SquareStatus } from '../types';
import { isPlayersTurn } from '../util';
import './Board.css';
import Square from './Square';

const Board = (): JSX.Element => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);
  const boardInversion = useSelector((state: RootState) => state.ui.boardInversion);
  const player = useSelector((state: RootState) => state.ui.player);

  const board = gameState.board.slice(0);
  if (boardInversion) board.reverse();

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
    if (madeMove && isPlayersTurn(gameState.turn, player)) {
      handleMove(row, col);
    } else {
      handleSelect(row, col);
    }
  };

  return (
    <div className="Board">
      {board.map((row, rowN) => {
        const Row = row.slice(0);
        if (boardInversion) Row.reverse();
        return (
          <div key={uid(rowN)} className="row">
            {Row.map((val, colN) => {
              return <Square key={uid(val)} content={val} clickHandler={handleSquareClick} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
