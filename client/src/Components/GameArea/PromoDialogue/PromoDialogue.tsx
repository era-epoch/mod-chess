import { faChessBishop, faChessKnight, faChessQueen, faChessRook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/rootReducer';
import { endTurnDirect, promotePiece } from '../../../state/slices/game/slice';
import { PieceIdentifier } from '../../../types';

const PromoDialogue = (): JSX.Element => {
  const promoPiece = useSelector((state: RootState) => state.game.promoPiece);
  const dispatch = useDispatch();

  const promote = (target: PieceIdentifier) => {
    dispatch(promotePiece(target));
    dispatch(endTurnDirect());
  };

  return (
    <div className="game-dialogue-wrapper" style={promoPiece === null ? { display: 'none' } : { display: 'flex' }}>
      <div className="game-dialogue-content">
        <div className="game-dialogue-title">Pawn Promotion</div>
        <div className="pawn-promo-options">
          <div className="promo-op" onClick={() => promote(PieceIdentifier.basicQueen)}>
            <FontAwesomeIcon icon={faChessQueen} />
          </div>
          <div className="promo-op" onClick={() => promote(PieceIdentifier.basicRook)}>
            <FontAwesomeIcon icon={faChessRook} />
          </div>
          <div className="promo-op" onClick={() => promote(PieceIdentifier.basicBishop)}>
            <FontAwesomeIcon icon={faChessBishop} />
          </div>
          <div className="promo-op" onClick={() => promote(PieceIdentifier.basicKnight)}>
            <FontAwesomeIcon icon={faChessKnight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoDialogue;
