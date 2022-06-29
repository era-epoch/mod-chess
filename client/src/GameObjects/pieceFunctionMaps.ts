import { PieceIdentifier, MoveFunction } from '../types';
import {
  emptyMoveF,
  pawnBasicMoveF,
  rookBasicMoveF,
  knightBasicMoveF,
  bishopBasicMoveF,
  queenBasicMoveF,
  kingBasicMoveF,
} from './basic/moveFunctions';
import { crimsonPawnMoveF } from './crimson/functions';
import { scourgePawnMoveF } from './scourge/functions';

export const moveFunctionMap = new Map<PieceIdentifier, MoveFunction>([
  [PieceIdentifier.emptyBasic, emptyMoveF],
  [PieceIdentifier.pawnBasic, pawnBasicMoveF],
  [PieceIdentifier.rookBasic, rookBasicMoveF],
  [PieceIdentifier.knightBasic, knightBasicMoveF],
  [PieceIdentifier.bishopBasic, bishopBasicMoveF],
  [PieceIdentifier.queenBasic, queenBasicMoveF],
  [PieceIdentifier.kingBasic, kingBasicMoveF],
  [PieceIdentifier.scourgePawn, scourgePawnMoveF],
  [PieceIdentifier.crimsonPawn, crimsonPawnMoveF],
]);

export default moveFunctionMap;
