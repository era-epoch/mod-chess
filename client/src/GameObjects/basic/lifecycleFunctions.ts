import { GameState } from '../../state/slices/game/slice';
import { LifecycleFunction, Piece } from '../../types';

export const standardOnDeathF: LifecycleFunction = (piece: Piece, row: number, col: number, state: GameState): void => {
  return;
};

export const standardOnCaptureF: LifecycleFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
): void => {
  return;
};

export const standardOnMovedF: LifecycleFunction = (piece: Piece, row: number, col: number, state: GameState): void => {
  return;
};

export const standardOnTurnStartF: LifecycleFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
): void => {
  return;
};

export const standardOnTurnEndF: LifecycleFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
): void => {
  return;
};

export const standardOnRoundEndF: LifecycleFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
): void => {
  return;
};
