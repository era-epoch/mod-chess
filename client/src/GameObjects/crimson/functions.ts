import { GameState } from '../../state/slices/game/slice';
import { MoveFunction, Piece, Move } from '../../types';
import { pawnBasicMoveF } from '../basic/moveFunctions';

export const crimsonPawnMoveF: MoveFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  checkKing: boolean = true,
): Move[] => {
  return pawnBasicMoveF(piece, row, col, state, checkKing);
};
