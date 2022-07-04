import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pieceIconMap from '../../GameObjects/pieceIconMap';
import { Piece, PlayerColour } from '../../types';
import './Piece.css';

interface Props {
  piece: Piece;
}

const BoardPiece = (props: Props): JSX.Element => {
  const icon = pieceIconMap.get(props.piece.identifier);
  return (
    <div className="icon-wrapper">
      <FontAwesomeIcon
        icon={icon}
        className={`${props.piece.owner === PlayerColour.dark ? 'dark-piece' : 'light-piece'} ${props.piece.origin}`}
      />
    </div>
  );
};

export default BoardPiece;
