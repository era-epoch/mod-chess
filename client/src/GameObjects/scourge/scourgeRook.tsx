import { faBolt, faChessRook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/rootReducer';
import { clearHighlights } from '../../state/slices/game/helpers';
import { GameState, updateActiveAbility, selectSquare } from '../../state/slices/game/slice';
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
        dispatch(selectSquare({ row: selectedRow, col: selectedCol }));
      }
    }
  };
  // TODO: Change vis for enemy pieces
  // TODO: Get ability cost from somewhere central
  return (
    <div className={`detail ability quick${activeAbility === abilityId ? ' active' : ''}`} onClick={handleClick}>
      <div>
        <FontAwesomeIcon icon={faBolt} className="detail-icon rune" />
        <span className="detail-title">{getAbilityName(abilityId)}: </span>
        <span className="detail-info">
          <span className="emph poison-text">Poison</span> any piece adjacent to this piece.
        </span>
      </div>
      <div>
        <div className="detail-rune-cost">
          <div className={`rune`}>
            <FontAwesomeIcon icon={faBolt} />
          </div>
          <div>2</div>
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
  let activated = false;
  if (Math.abs(targetRow - sourceLocation.row) <= 1 && Math.abs(targetCol - sourceLocation.col) <= 1) {
    state.board[targetRow][targetCol].piece.statuses.push(PieceStatus.PSN);
    activated = true;
  }

  // Subtract rune cost if ability successfully activated
  if (player === PlayerColour.light) {
    if (activated) state.lightRunes -= abilityRuneCost;
  } else {
    if (activated) state.darkRunes -= abilityRuneCost;
  }

  // End turn
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
