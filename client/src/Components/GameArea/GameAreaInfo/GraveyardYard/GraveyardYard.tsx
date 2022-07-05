import { uid } from 'react-uid';
import { Graveyard, Piece } from '../../../../types';
import BoardPiece from '../../../Piece/Piece';
import './GraveyardYard.css';

interface Props {
  graveyard: Graveyard;
}

const GraveyardYard = (props: Props): JSX.Element => {
  return (
    <div className="graveyard">
      {props.graveyard.contents.length === 0 ? (
        <p>No captures</p>
      ) : (
        props.graveyard.contents.map((piece: Piece) => {
          return (
            <div className="graveyard-icon-wrapper">
              <BoardPiece key={uid(piece)} piece={piece} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default GraveyardYard;
