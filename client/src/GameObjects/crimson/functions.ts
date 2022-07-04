import { GameState } from '../../state/slices/game/slice';
import { MoveFunction, Piece, Move } from '../../types';
import { basicPawnMoveF } from '../basic/moveFunctions';

export const crimsonPawnMoveF: MoveFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  checkKing: boolean = true,
): Move[] => {
  return basicPawnMoveF(piece, row, col, state, checkKing);
};
