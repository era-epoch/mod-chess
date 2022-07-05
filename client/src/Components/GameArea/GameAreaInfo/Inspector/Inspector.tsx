import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { pieceInfoMap } from '../../../Details/details';
import { RootState } from '../../../../state/rootReducer';
import { Piece, PieceType, PlayerColour } from '../../../../types';
import BoardPiece from '../../../Piece/Piece';
import './Inspector.css';

const Inspector = (): JSX.Element => {
  const row = useSelector((state: RootState) => state.game.selectedRow);
  const col = useSelector((state: RootState) => state.game.selectedCol);
  const board = useSelector((state: RootState) => state.game.board);
  const selected = row !== null && col != null;
  let piece = null;
  let infoBits = null;
  if (selected) {
    piece = board[row][col].piece as Piece;
    infoBits = pieceInfoMap.get(piece.identifier);
  }
  return (
    <div className="inspector">
      {selected && piece && piece.type !== PieceType.empty ? (
        <div className="inspector-row">
          <div className={`inspector-image ${piece.owner === PlayerColour.dark ? 'dark-image' : 'light-image'}`}>
            <BoardPiece piece={piece} />
          </div>
          <div className="inspector-details">
            <div className="inspector-name">{piece.name}</div>
            {infoBits?.map((i: Function) => {
              return i();
            })}
          </div>
        </div>
      ) : (
        <div className="inspector-row">
          <div className="inspector-image">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faQuestion} />
            </div>
          </div>
          <div className="inspector-details">
            <div className="inspector-details-default">
              Select a square to display information about its contents here.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inspector;
