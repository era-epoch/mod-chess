import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { pieceInfoMap } from '../../../Details/pieceDetails';
import { RootState } from '../../../../state/rootReducer';
import { Piece, PieceType, PlayerColour } from '../../../../types';
import BoardPiece from '../../../Piece/Piece';
import './Inspector.css';
import { uid } from 'react-uid';
import { statusInfoMap } from '../../../Details/statusDetails';

const Inspector = (): JSX.Element => {
  const row = useSelector((state: RootState) => state.game.selectedRow);
  const col = useSelector((state: RootState) => state.game.selectedCol);
  const board = useSelector((state: RootState) => state.game.board);
  const selected = row !== null && col != null;
  let piece = null;
  let infoBits = null;
  let statusBits = null;
  if (selected) {
    piece = board[row][col].piece as Piece;
    infoBits = pieceInfoMap.get(piece.identifier);
    statusBits = [];
    for (let i = 0; i < piece.statuses.length; i++) {
      const statusDetails = statusInfoMap.get(piece.statuses[i]);
      if (statusDetails) statusBits.push(...statusDetails);
    }
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
            {statusBits?.map((i: Function) => {
              return <div key={uid(i)}>{i()}</div>;
            })}
            {infoBits?.map((i: Function) => {
              return <div key={uid(i)}>{i()}</div>;
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
