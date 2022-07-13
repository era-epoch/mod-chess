import { capturePieceAtLocation } from '../state/slices/game/helpers';
import { GameState } from '../state/slices/game/slice';
import {
  AbilityHoverFunction,
  AbilitySelectFunction,
  CaptureFunction,
  DeathFunction,
  Graveyard,
  LifecycleFunction,
  Piece,
  PieceStatus,
  PieceType,
  PlayerColour,
  SquareStatus,
} from '../types';
import { getCurrentPlayer } from '../util';
import { EmptySquare } from './basic/emptySquare';

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
  piece.nMoves++;
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
    }
    if (piece.owner === PlayerColour.dark) {
      state.darkRunes++;
    }
  }
};

export const standardOnTurnEndF: LifecycleFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
): void => {
  // Check to see if the piece dies from poison
  let poisonStacks = 0;
  for (let i = 0; i < piece.statuses.length; i++) {
    if (piece.statuses[i] === PieceStatus.PSN) {
      poisonStacks++;
    }
  }
  // If poison stacks >=3 AND it is this player's turn
  const immune = piece.statuses.includes(PieceStatus.immune);
  if (!immune && poisonStacks >= 3 && piece.owner === getCurrentPlayer(state.turn)) {
    capturePieceAtLocation(state, row, col);
  }
};

export const standardOnRoundEndF: LifecycleFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
): void => {
  return;
};

export const standardAbilitySelectF: AbilitySelectFunction = (source: Piece, state: GameState) => {
  return;
};

export const standardAbilityHoverF: AbilityHoverFunction = (source: Piece, state: GameState) => {
  return;
};
