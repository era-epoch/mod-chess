import { GameState } from '../../state/slices/game/slice';
import { Move, MoveFunction, Piece } from '../../types';
import { basicPawnMoveF } from '../basic/moveFunctions';

export const scourgePawnMoveF: MoveFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  checkKing: boolean = true,
): Move[] => {
  return basicPawnMoveF(piece, row, col, state, checkKing);
};
