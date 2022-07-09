import { faBolt, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AbilityName } from '../../GameObjects/ability';
import { RootState } from '../../state/rootReducer';
import { resetSelection, selectSquare, updateActiveAbility } from '../../state/slices/game/slice';
import { PieceIdentifier } from '../../types';
import './details.css';

// SOURCES: Wikipedia

const PawnDetail = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className="detail-icon" />
        <span className="detail-title">Pawn: </span>
        <span className="detail-info">
          A pawn can move forward to the unoccupied square immediately in front of it on the same file, or on its first
          move it can advance two squares along the same file, provided both squares are unoccupied. A pawn can capture
          an opponent's piece on a square diagonally in front of it by moving to that square.
        </span>
      </div>
    </div>
  );
};

const EnPassantDetail = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className="detail-icon" />
        <span className="detail-title">En Passant: </span>
        <span className="detail-info">
          When a pawn makes a two-step advance from its starting position and there is an opponent's pawn on a square
          next to the destination square on an adjacent file, then the opponent's pawn can capture it en passant ("in
          passing"), moving to the square the pawn passed over. This can be done only on the turn immediately following
          the enemy pawn's two-square advance
        </span>
      </div>
    </div>
  );
};

const PromotionDetail = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className="detail-icon" />
        <span className="detail-title">Promotion: </span>
        <span className="detail-info">
          When a pawn advances to its eighth rank, as part of the move, it is promoted and must be exchanged for the
          player's choice of queen, rook, bishop, or knight of the same color.
        </span>
      </div>
    </div>
  );
};

const KnightDetail = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className="detail-icon" />
        <span className="detail-title">Knight: </span>
        <span className="detail-info">
          A knight moves to any of the closest squares that are not on the same rank, file, or diagonal. (Thus the move
          forms an "L"-shape: two squares vertically and one square horizontally, or two squares horizontally and one
          square vertically.)
        </span>
      </div>
    </div>
  );
};

const BishopDetail = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className="detail-icon" />
        <span className="detail-title">Bishop: </span>
        <span className="detail-info">
          A bishop can move any number of squares diagonally, but cannot leap over other pieces.
        </span>
      </div>
    </div>
  );
};

const RookDetail = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className="detail-icon" />
        <span className="detail-title">Rook: </span>
        <span className="detail-info">
          A rook can move any number of squares along a rank or file, but cannot leap over other pieces.
        </span>
      </div>
    </div>
  );
};

const QueenDetail = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className="detail-icon" />
        <span className="detail-title">Queen: </span>
        <span className="detail-info">
          A queen combines the power of a rook and bishop and can move any number of squares along a rank, file, or
          diagonal, but cannot leap over other pieces.
        </span>
      </div>
    </div>
  );
};

const KingDetail = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className="detail-icon" />
        <span className="detail-title">King: </span>
        <span className="detail-info">
          The king moves one square in any direction. The king is the most valuable piece — attacks on the king must be
          immediately countered, and if this is impossible, immediate loss of the game ensues.
        </span>
      </div>
    </div>
  );
};

const CastlingDetail = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className="detail-icon" />
        <span className="detail-title">Castling: </span>
        <span className="detail-info">
          Once per game, each king can make a move known as castling. Castling consists of moving the king two squares
          toward a rook of the same color on the same rank, and then placing the rook on the square that the king
          crossed. Castling is permissible if the following conditions are met:
        </span>
      </div>
      <div className="detail-list">
        <div>1. Neither the king nor the rook has previously moved during the game.</div>
        <div>2. There are no pieces between the king and the rook.</div>
        <div>
          3. The king is not in check and does not pass through or land on any square attacked by an enemy piece.
        </div>
      </div>
      <span>Castling is still permitted if the rook is under attack, or if the rook crosses an attacked square.</span>
    </div>
  );
};

const ScourgePawnDetail = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div>
        <FontAwesomeIcon icon={faCircleInfo} className="detail-icon" />
        <span className="detail-title">Posthumous Transmission: </span>
        <span className="detail-info">
          When this piece is captured, the capturing piece gains one stack of <i>poisoned</i>.
        </span>
      </div>
    </div>
  );
};

const ScourgeBishopDetail = (): JSX.Element => {
  const activeAbility = useSelector((state: RootState) => state.game.activeAbility);
  const selectedCol = useSelector((state: RootState) => state.game.selectedCol);
  const selectedRow = useSelector((state: RootState) => state.game.selectedRow);
  const abilityName = AbilityName.cure;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (activeAbility !== abilityName) {
      dispatch(updateActiveAbility(abilityName));
    } else {
      // Deactivate
      dispatch(updateActiveAbility(AbilityName.none));
      if (selectedCol && selectedRow) {
        dispatch(resetSelection()); // Since selecting the same square twice hides it
        dispatch(selectSquare({ row: selectedRow, col: selectedCol }));
      }
    }
  };
  // TODO: Change vis for enemy pieces
  // TODO: Get ability cost from somewhere central
  return (
    <div className={`detail ability quick${activeAbility === abilityName ? ' active' : ''}`} onClick={handleClick}>
      <div>
        <FontAwesomeIcon icon={faBolt} className="detail-icon rune" />
        <span className="detail-title">Cure Sickness: </span>
        <span className="detail-info">
          (Quick) Remove one stack of <span className="emph poison-text">poisoned</span> from any of your pieces.
        </span>
      </div>
      <div>
        <div className="detail-rune-cost">
          <div className={`rune`}>
            <FontAwesomeIcon icon={faBolt} />
          </div>
          <div>1</div>
        </div>
      </div>
    </div>
  );
};

const ScourgeRookDetail = (): JSX.Element => {
  const activeAbility = useSelector((state: RootState) => state.game.activeAbility);
  const selectedCol = useSelector((state: RootState) => state.game.selectedCol);
  const selectedRow = useSelector((state: RootState) => state.game.selectedRow);
  const abilityName = AbilityName.infect;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (activeAbility !== abilityName) {
      dispatch(updateActiveAbility(abilityName));
    } else {
      // Deactivate
      dispatch(updateActiveAbility(AbilityName.none));
      if (selectedCol && selectedRow) {
        dispatch(selectSquare({ row: selectedRow, col: selectedCol }));
      }
    }
  };
  // TODO: Change vis for enemy pieces
  // TODO: Get ability cost from somewhere central
  return (
    <div className={`detail ability quick${activeAbility === abilityName ? ' active' : ''}`} onClick={handleClick}>
      <div>
        <FontAwesomeIcon icon={faBolt} className="detail-icon rune" />
        <span className="detail-title">Infect: </span>
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

export const pieceInfoMap = new Map<PieceIdentifier, React.FC[]>([
  [PieceIdentifier.basicPawn, [PawnDetail, EnPassantDetail, PromotionDetail]],
  [PieceIdentifier.basicBishop, [BishopDetail]],
  [PieceIdentifier.basicKnight, [KnightDetail]],
  [PieceIdentifier.basicRook, [RookDetail]],
  [PieceIdentifier.basicQueen, [QueenDetail]],
  [PieceIdentifier.basicKing, [KingDetail, CastlingDetail]],
  [PieceIdentifier.scourgePawn, [ScourgePawnDetail, PawnDetail, EnPassantDetail, PromotionDetail]],
  [PieceIdentifier.scourgeBishop, [ScourgeBishopDetail, BishopDetail]],
  [PieceIdentifier.scourgeRook, [ScourgeRookDetail, RookDetail]],
]);
