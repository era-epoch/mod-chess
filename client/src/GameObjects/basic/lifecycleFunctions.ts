import { GameState } from '../../state/slices/game/slice';
import {
  CaptureFunction,
  DeathFunction,
  Graveyard,
  LifecycleFunction,
  Piece,
  PieceType,
  PlayerColour,
  SquareStatus,
} from '../../types';
import { EmptySquare } from './pieces';

export const standardOnDeathF: DeathFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  capturer?: Piece,
): void => {
  const player = piece.owner;
  const graveyard = state.graveyards.find((g: Graveyard) => g.player === (player + 1) % 2);
  if (state.board[row][col].piece.type !== PieceType.empty) {
    graveyard?.contents.push(piece);
  }
  state.board[row][col].piece = EmptySquare();
};

export const standardOnCaptureF: CaptureFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  target: Piece,
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
  // Collect runes from squares with pieces on them
  if (state.board[row][col].squareStatuses.includes(SquareStatus.RUNE)) {
    if (piece.owner === PlayerColour.light) {
      state.lightRunes++;
      console.log(state.lightRunes);
    }
    if (piece.owner === PlayerColour.dark) {
      state.darkRunes++;
    }
  }
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
