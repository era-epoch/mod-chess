import { clearHighlights } from '../../state/slices/game/helpers';
import { GameState } from '../../state/slices/game/slice';
import { AbilityFunction, AbilitySelectFunction, DeathFunction, Piece, PieceStatus, PlayerColour } from '../../types';
import { getCurrentPlayer, getPieceLocation } from '../../util';
import { standardOnDeathF } from '../basic/lifecycleFunctions';

export const scourgePawnOnDeathF: DeathFunction = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  capturer?: Piece,
) => {
  if (capturer) {
    capturer.statuses.push(PieceStatus.PSN);
    standardOnDeathF(piece, row, col, state, capturer);
  } else {
    standardOnDeathF(piece, row, col, state);
  }
};

export const cureSelectF: AbilitySelectFunction = (source: Piece, state: GameState) => {
  clearHighlights(state);
};

export const cureAbilityF: AbilityFunction = (
  source: Piece,
  targetRow: number,
  targetCol: number,
  state: GameState,
) => {
  const abilityRuneCost = 1;

  const player = getCurrentPlayer(state.turn);

  // TODO: Check this before entering the reducer to allow for visual feedback
  // Insufficient Runes
  if (player === PlayerColour.light) {
    if (state.lightRunes < abilityRuneCost) {
      return;
    }
  } else {
    if (state.darkRunes < abilityRuneCost) {
      return;
    }
  }

  const target = state.board[targetRow][targetCol].piece;
  let activated = false;
  if (target.owner === player) {
    const index = target.statuses.findIndex((s: PieceStatus) => s === PieceStatus.PSN);
    if (index >= 0) {
      state.board[targetRow][targetCol].piece.statuses.splice(index, 1);
      activated = true;
    }
  }

  // Subtract rune cost if ability successfully activated
  if (player === PlayerColour.light) {
    if (activated) state.lightRunes -= abilityRuneCost;
  } else {
    if (activated) state.darkRunes -= abilityRuneCost;
  }
};

export const infectSelectF: AbilitySelectFunction = (source: Piece, state: GameState) => {
  clearHighlights(state);
};

export const infectAbilityF: AbilityFunction = (
  source: Piece,
  targetRow: number,
  targetCol: number,
  state: GameState,
) => {
  const abilityRuneCost = 2;

  const player = getCurrentPlayer(state.turn);

  // TODO: Check this before entering the reducer to allow for visual feedback
  // Insufficient Runes
  if (player === PlayerColour.light) {
    if (state.lightRunes < abilityRuneCost) {
      return;
    }
  } else {
    if (state.darkRunes < abilityRuneCost) {
      return;
    }
  }
  const sourceLocation = getPieceLocation(source, state);
  let activated = false;
  if (Math.abs(targetRow - sourceLocation.row) <= 1 && Math.abs(targetCol - sourceLocation.col) <= 1) {
    state.board[targetRow][targetCol].piece.statuses.push(PieceStatus.PSN);
  }

  // Subtract rune cost if ability successfully activated
  if (player === PlayerColour.light) {
    if (activated) state.lightRunes -= abilityRuneCost;
  } else {
    if (activated) state.darkRunes -= abilityRuneCost;
  }

  // End turn
};
