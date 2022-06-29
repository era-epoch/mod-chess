import { GameState } from '../../state/slices/game/slice';
import { Piece } from '../../types';

export const standardOnDeathF = (piece: Piece, row: number, col: number, state: GameState): void => {
  return;
};

export const standardOnCaptureF = (piece: Piece, row: number, col: number, state: GameState): void => {
  return;
};

export const standardOnMovedF = (piece: Piece, row: number, col: number, state: GameState): void => {
  return;
};

export const standardOnTurnEndF = (piece: Piece, row: number, col: number, state: GameState): void => {
  return;
};

export const standardOnRoundEndF = (piece: Piece, row: number, col: number, state: GameState): void => {
  return;
};
