import { PieceIdentifier, MoveFunction, LifecycleFunction } from '../types';
import { standardOnDeathF } from './basic/lifecycleFunctions';
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

export const onDeathFunctionMap = new Map<PieceIdentifier, LifecycleFunction>([
  [PieceIdentifier.empty, standardOnDeathF],
  [PieceIdentifier.basicPawn, standardOnDeathF],
  [PieceIdentifier.basicRook, standardOnDeathF],
  [PieceIdentifier.basicKnight, standardOnDeathF],
  [PieceIdentifier.basicBishop, standardOnDeathF],
  [PieceIdentifier.basicQueen, standardOnDeathF],
  [PieceIdentifier.basicKing, standardOnDeathF],
  [PieceIdentifier.scourgePawn, standardOnDeathF],
  [PieceIdentifier.crimsonPawn, standardOnDeathF],
]);

export default moveFunctionMap;
