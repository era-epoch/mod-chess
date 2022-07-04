import { PieceIdentifier, MoveFunction } from '../types';
import {
  emptyMoveF,
  basicPawnMoveF,
  basicRookMoveF,
  basicKnightMoveF,
  basicBishopMoveF,
  basicQueenMoveF,
  basicKingMoveF,
} from './basic/moveFunctions';
import { crimsonPawnMoveF } from './crimson/functions';
import { scourgePawnMoveF } from './scourge/functions';

export const moveFunctionMap = new Map<PieceIdentifier, MoveFunction>([
  [PieceIdentifier.empty, emptyMoveF],
  [PieceIdentifier.basicPawn, basicPawnMoveF],
  [PieceIdentifier.basicRook, basicRookMoveF],
  [PieceIdentifier.basicKnight, basicKnightMoveF],
  [PieceIdentifier.basicBishop, basicBishopMoveF],
  [PieceIdentifier.basicQueen, basicQueenMoveF],
  [PieceIdentifier.basicKing, basicKingMoveF],
  [PieceIdentifier.scourgePawn, scourgePawnMoveF],
  [PieceIdentifier.crimsonPawn, crimsonPawnMoveF],
]);

export default moveFunctionMap;
