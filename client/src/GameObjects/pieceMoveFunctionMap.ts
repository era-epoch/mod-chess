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

const moveFunctionMap = new Map<PieceIdentifier, MoveFunction>([
  [PieceIdentifier.emptyBasic, emptyMoveF],
  [PieceIdentifier.pawnBasic, pawnBasicMoveF],
  [PieceIdentifier.rookBasic, rookBasicMoveF],
  [PieceIdentifier.knightBasic, knightBasicMoveF],
  [PieceIdentifier.bishopBasic, bishopBasicMoveF],
  [PieceIdentifier.queenBasic, queenBasicMoveF],
  [PieceIdentifier.kingBasic, kingBasicMoveF],
]);

export default moveFunctionMap;
