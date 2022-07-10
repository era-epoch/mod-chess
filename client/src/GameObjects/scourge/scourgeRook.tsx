import { faBolt, faChessRook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/rootReducer';
import { clearAOEHighlights, clearHighlights } from '../../state/slices/game/helpers';
import { GameState, updateActiveAbility, selectSquare, resetSelection, clearAOE } from '../../state/slices/game/slice';
import {
  Piece,
  PlayerColour,
  Orientation,
  PieceIdentifier,
  PieceType,
  PieceOrigin,
  AbilitySelectFunction,
  AbilityFunction,
  PieceStatus,
  SquareStatus,
} from '../../types';
import { getCurrentPlayer, getPieceLocation } from '../../util';
import { Ability, getAbilityName, getAbilityRuneCost, registerAbility } from '../ability';
import { basicRookMoveF, RookDetail } from '../basic/basicRook';
import { GamePiece, registerGamePiece } from '../gamePiece';
import { genPID } from '../gameUtil';
import {
  standardOnDeathF,
  standardOnCaptureF,
  standardOnMovedF,
  standardOnTurnStartF,
  standardOnTurnEndF,
} from '../standardFunctions';

export const ScourgeRook = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    identifier: PieceIdentifier.scourgeRook,
    type: PieceType.rook,
    origin: PieceOrigin.scourge,
    id: genPID(),
    name: 'Scourge Rook',
  };
  return piece;
};

const ScourgeRookDetail = (): JSX.Element => {
  const activeAbility = useSelector((state: RootState) => state.game.activeAbility);
  const selectedCol = useSelector((state: RootState) => state.game.selectedCol);
  const selectedRow = useSelector((state: RootState) => state.game.selectedRow);
  const abilityId = 'infect';
  const dispatch = useDispatch();
  const handleClick = () => {
    if (activeAbility !== abilityId) {
      dispatch(updateActiveAbility(abilityId));
    } else {
      // Deactivate
      dispatch(updateActiveAbility(''));
      if (selectedCol && selectedRow) {
        dispatch(resetSelection()); // Since selecting the same square twice hides it
        dispatch(clearAOE());
        dispatch(selectSquare({ row: selectedRow, col: selectedCol }));
      }
    }
  };
  // TODO: Change vis for enemy pieces
  return (
    <div className={`detail ability quick${activeAbility === abilityId ? ' active' : ''}`} onClick={handleClick}>
      <div>
        <FontAwesomeIcon icon={faBolt} className="detail-icon rune" />
        <span className="detail-title">{getAbilityName(abilityId)}: </span>
        <span className="detail-info">
          <span className="emph poison-text">Poison</span> any piece within one square of this piece.
        </span>
      </div>
      <div>
        <div className="detail-rune-cost">
          <div className={`rune`}>
            <FontAwesomeIcon icon={faBolt} />
          </div>
          <div>{getAbilityRuneCost(abilityId)}</div>
        </div>
      </div>
    </div>
  );
};

const ScourgeRookGamePiece: GamePiece = {
  identifier: PieceIdentifier.scourgeRook,
  moveF: basicRookMoveF,
  onDeathF: standardOnDeathF,
  onCaptureF: standardOnCaptureF,
  onMovedF: standardOnMovedF,
  onTurnStartF: standardOnTurnStartF,
  onTurnEndF: standardOnTurnEndF,
  details: [ScourgeRookDetail, RookDetail],
  icon: faChessRook,
};

registerGamePiece(ScourgeRookGamePiece);

// ABILITIES

export const infectSelectF: AbilitySelectFunction = (source: Piece, state: GameState) => {
  clearHighlights(state);
  // AOE Effect Highlights
  if (state.selectedRow && state.selectedCol) {
    if (state.board[state.selectedRow + 1][state.selectedCol].inBounds) {
      state.board[state.selectedRow + 1][state.selectedCol].squareStatuses.push(
        ...[SquareStatus.AOE, SquareStatus.AOE_B, SquareStatus.AOE_PSN],
      );
    }
    if (state.board[state.selectedRow - 1][state.selectedCol].inBounds) {
      state.board[state.selectedRow - 1][state.selectedCol].squareStatuses.push(
        ...[SquareStatus.AOE, SquareStatus.AOE_T, SquareStatus.AOE_PSN],
      );
    }
    if (state.board[state.selectedRow][state.selectedCol + 1].inBounds) {
      state.board[state.selectedRow][state.selectedCol + 1].squareStatuses.push(
        ...[SquareStatus.AOE, SquareStatus.AOE_R, SquareStatus.AOE_PSN],
      );
    }
    if (state.board[state.selectedRow][state.selectedCol - 1].inBounds) {
      state.board[state.selectedRow][state.selectedCol - 1].squareStatuses.push(
        ...[SquareStatus.AOE, SquareStatus.AOE_L, SquareStatus.AOE_PSN],
      );
    }
    if (state.board[state.selectedRow + 1][state.selectedCol + 1].inBounds) {
      state.board[state.selectedRow + 1][state.selectedCol + 1].squareStatuses.push(
        ...[SquareStatus.AOE, SquareStatus.AOE_B, SquareStatus.AOE_R, SquareStatus.AOE_PSN],
      );
    }
    if (state.board[state.selectedRow - 1][state.selectedCol + 1].inBounds) {
      state.board[state.selectedRow - 1][state.selectedCol + 1].squareStatuses.push(
        ...[SquareStatus.AOE, SquareStatus.AOE_T, SquareStatus.AOE_R, SquareStatus.AOE_PSN],
      );
    }
    if (state.board[state.selectedRow + 1][state.selectedCol - 1].inBounds) {
      state.board[state.selectedRow + 1][state.selectedCol - 1].squareStatuses.push(
        ...[SquareStatus.AOE, SquareStatus.AOE_B, SquareStatus.AOE_L, SquareStatus.AOE_PSN],
      );
    }
    if (state.board[state.selectedRow - 1][state.selectedCol - 1].inBounds) {
      state.board[state.selectedRow - 1][state.selectedCol - 1].squareStatuses.push(
        ...[SquareStatus.AOE, SquareStatus.AOE_T, SquareStatus.AOE_L, SquareStatus.AOE_PSN],
      );
    }
  }
};

export const infectAbilityF: AbilityFunction = (
  source: Piece,
  targetRow: number,
  targetCol: number,
  state: GameState,
) => {
  const abilityRuneCost = getAbilityRuneCost('infect');
  if (!abilityRuneCost) return;

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
  const yDiff = Math.abs(targetRow - sourceLocation.row);
  const xDiff = Math.abs(targetCol - sourceLocation.col);
  if (yDiff <= 1 && xDiff <= 1 && yDiff + xDiff > 0) {
    if (state.board[targetRow][targetCol].piece.type !== PieceType.empty) {
      state.board[targetRow][targetCol].piece.statuses.push(PieceStatus.PSN);
      state.abilityActivatedFlag = true;
    }
  }

  // Subtract rune cost if ability successfully activated
  if (player === PlayerColour.light) {
    if (state.abilityActivatedFlag) state.lightRunes -= abilityRuneCost;
  } else {
    if (state.abilityActivatedFlag) state.darkRunes -= abilityRuneCost;
  }

  if (state.abilityActivatedFlag) {
    clearAOEHighlights(state);
  }
};

const InfectAbility: Ability = {
  id: 'infect',
  name: 'Infect',
  renderString: 'ability-infect',
  runeCost: 2,
  quick: false,
  selectF: infectSelectF,
  abilityF: infectAbilityF,
};

registerAbility(InfectAbility);
