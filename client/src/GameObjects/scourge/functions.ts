import { GameState } from '../../state/slices/game/slice';
import { AbilityFunction, DeathFunction, Piece, PieceStatus, PlayerColour } from '../../types';
import { getCurrentPlayer } from '../../util';
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
    console.log(capturer.statuses);
    standardOnDeathF(piece, row, col, state, capturer);
  } else {
    standardOnDeathF(piece, row, col, state);
  }
};

export const cureAbilityF: AbilityFunction = (
  source: Piece,
  targetRow: number,
  targetCol: number,
  state: GameState,
) => {
  const abilityRuneCost = 1;

  const player = getCurrentPlayer(state.turn);
  if (player === PlayerColour.light) {
    if (state.lightRunes < abilityRuneCost) {
      // TODO: Check this before entering the reducer to allow for visual feedback
      // Insufficient Runes
      return;
    }
    state.lightRunes -= abilityRuneCost;
  } else {
    if (state.darkRunes < abilityRuneCost) {
      return;
    }
    state.darkRunes -= abilityRuneCost;
  }
  const target = state.board[targetRow][targetCol].piece;

  if (target.owner === player) {
    const index = target.statuses.findIndex((s: PieceStatus) => s === PieceStatus.PSN);
    if (index >= 0) {
      state.board[targetRow][targetCol].piece.statuses.splice(index, 1);
    }
  }
};
