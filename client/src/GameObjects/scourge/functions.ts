import { GameState } from '../../state/slices/game/slice';
import { DeathFunction, Move, MoveFunction, Piece, PieceStatus } from '../../types';
import { standardOnDeathF } from '../basic/lifecycleFunctions';
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

export const scourgePawnOnDeathF: DeathFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  capturer?: Piece,
) => {
  console.log('deathF');
  if (capturer) {
    capturer.statuses.push(PieceStatus.PSN);
    console.log(capturer.statuses);
    standardOnDeathF(piece, row, col, state, capturer);
  } else {
    standardOnDeathF(piece, row, col, state);
  }
};
