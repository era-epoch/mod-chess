import { faBolt, faChessKnight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/rootReducer';
import { clearHighlights } from '../../state/slices/game/helpers';
import {
  updateActiveAbility,
  resetSelection,
  clearAOE,
  selectSquare,
  GameState,
  hoverActiveAbility,
  tryActivateAbility,
} from '../../state/slices/game/slice';
import {
  Piece,
  PlayerColour,
  Orientation,
  PieceIdentifier,
  PieceType,
  PieceOrigin,
  AbilityFunction,
  PieceStatus,
  AbilityHoverFunction,
  SquareStatus,
} from '../../types';
import { getCurrentPlayer, getPieceLocation, isPlayersTurn } from '../../util';
import { Ability, getAbilityName, getAbilityRuneCost, registerAbility } from '../ability';
import { basicKnightMoveF, KnightDetail } from '../basic/basicKnight';
import { GamePiece, GamePieceDetailProps, registerGamePiece } from '../gamePiece';
import { genPID } from '../gameUtil';
import {
  standardOnDeathF,
  standardOnCaptureF,
  standardOnMovedF,
  standardOnTurnStartF,
  standardOnTurnEndF,
  standardAbilitySelectF,
} from '../standardFunctions';

export const CrimsonKnight = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    identifier: PieceIdentifier.crimsonKnight,
    type: PieceType.knight,
    origin: PieceOrigin.crimson,
    id: genPID(),
    name: 'Bloated Mare',
  };
  return piece;
};

const CrimsonKnightDetail = (props: GamePieceDetailProps): JSX.Element => {
  return <div></div>;
};

const CrimsonKnightGamePiece: GamePiece = {
  identifier: PieceIdentifier.crimsonKnight,
  moveF: basicKnightMoveF,
  onDeathF: standardOnDeathF,
  onCaptureF: standardOnCaptureF,
  onMovedF: standardOnMovedF,
  onTurnStartF: standardOnTurnStartF,
  onTurnEndF: standardOnTurnEndF,
  details: [CrimsonKnightDetail, KnightDetail],
  icon: faChessKnight,
};

registerGamePiece(CrimsonKnightGamePiece);

// ABILITY
