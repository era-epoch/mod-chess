import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pieceIconMap from '../../GameObjects/pieceIconMap';
import { Piece, PieceStatus, PlayerColour } from '../../types';
import './Piece.css';

interface Props {
  piece: Piece;
}

const BoardPiece = (props: Props): JSX.Element => {
  const icon = pieceIconMap.get(props.piece.identifier);
  return (
    <div className="icon-wrapper">
      {icon !== null ? (
        <FontAwesomeIcon
          icon={icon}
          className={`${props.piece.owner === PlayerColour.dark ? 'dark-piece' : 'light-piece'} ${props.piece.origin}`}
        />
      ) : null}
      <div className="statuses">
        {props.piece.statuses.map((s: PieceStatus) => {
          if (s === PieceStatus.PSN) {
            return <FontAwesomeIcon icon={faSkullCrossbones} className="poison" />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default BoardPiece;
