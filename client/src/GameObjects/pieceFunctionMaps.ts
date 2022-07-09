import { PieceIdentifier, MoveFunction, LifecycleFunction, CaptureFunction, DeathFunction } from '../types';
import {
  standardOnCaptureF,
  standardOnDeathF,
  standardOnTurnEndF,
  standardOnTurnStartF,
} from './basic/lifecycleFunctions';
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
import { scourgePawnOnDeathF } from './scourge/functions';

export const moveFunctionMap = new Map<PieceIdentifier, MoveFunction>([
  [PieceIdentifier.empty, emptyMoveF],
  [PieceIdentifier.basicPawn, basicPawnMoveF],
  [PieceIdentifier.basicRook, basicRookMoveF],
  [PieceIdentifier.basicKnight, basicKnightMoveF],
  [PieceIdentifier.basicBishop, basicBishopMoveF],
  [PieceIdentifier.basicQueen, basicQueenMoveF],
  [PieceIdentifier.basicKing, basicKingMoveF],
  [PieceIdentifier.scourgePawn, basicPawnMoveF],
  [PieceIdentifier.scourgeBishop, basicBishopMoveF],
  [PieceIdentifier.crimsonPawn, crimsonPawnMoveF],
]);

export const onDeathFunctionMap = new Map<PieceIdentifier, DeathFunction>([
  [PieceIdentifier.empty, standardOnDeathF],
  [PieceIdentifier.basicPawn, standardOnDeathF],
  [PieceIdentifier.basicRook, standardOnDeathF],
  [PieceIdentifier.basicKnight, standardOnDeathF],
  [PieceIdentifier.basicBishop, standardOnDeathF],
  [PieceIdentifier.basicQueen, standardOnDeathF],
  [PieceIdentifier.basicKing, standardOnDeathF],
  [PieceIdentifier.scourgePawn, scourgePawnOnDeathF],
  [PieceIdentifier.scourgeBishop, standardOnDeathF],
  [PieceIdentifier.crimsonPawn, standardOnDeathF],
]);

export const onCaptureFunctionMap = new Map<PieceIdentifier, CaptureFunction>([
  [PieceIdentifier.empty, standardOnCaptureF],
  [PieceIdentifier.basicPawn, standardOnCaptureF],
  [PieceIdentifier.basicRook, standardOnCaptureF],
  [PieceIdentifier.basicKnight, standardOnCaptureF],
  [PieceIdentifier.basicBishop, standardOnCaptureF],
  [PieceIdentifier.basicQueen, standardOnCaptureF],
  [PieceIdentifier.basicKing, standardOnCaptureF],
  [PieceIdentifier.scourgePawn, standardOnCaptureF],
  [PieceIdentifier.scourgeBishop, standardOnCaptureF],
  [PieceIdentifier.crimsonPawn, standardOnCaptureF],
]);

export const onTurnStartFunctionMap = new Map<PieceIdentifier, LifecycleFunction>([
  [PieceIdentifier.empty, standardOnTurnStartF],
  [PieceIdentifier.basicPawn, standardOnTurnStartF],
  [PieceIdentifier.basicRook, standardOnTurnStartF],
  [PieceIdentifier.basicKnight, standardOnTurnStartF],
  [PieceIdentifier.basicBishop, standardOnTurnStartF],
  [PieceIdentifier.basicQueen, standardOnTurnStartF],
  [PieceIdentifier.basicKing, standardOnTurnStartF],
  [PieceIdentifier.scourgePawn, standardOnTurnStartF],
  [PieceIdentifier.scourgeBishop, standardOnTurnStartF],
  [PieceIdentifier.crimsonPawn, standardOnTurnStartF],
]);

export const onTurnEndFunctionMap = new Map<PieceIdentifier, LifecycleFunction>([
  [PieceIdentifier.empty, standardOnTurnEndF],
  [PieceIdentifier.basicPawn, standardOnTurnEndF],
  [PieceIdentifier.basicRook, standardOnTurnEndF],
  [PieceIdentifier.basicKnight, standardOnTurnEndF],
  [PieceIdentifier.basicBishop, standardOnTurnEndF],
  [PieceIdentifier.basicQueen, standardOnTurnEndF],
  [PieceIdentifier.basicKing, standardOnTurnEndF],
  [PieceIdentifier.scourgePawn, standardOnTurnEndF],
  [PieceIdentifier.scourgeBishop, standardOnTurnEndF],
  [PieceIdentifier.crimsonPawn, standardOnTurnEndF],
]);

export default moveFunctionMap;
