import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uid } from 'react-uid';
import pieceIconMap from '../GameObjects/pieceIcons';
import { Graveyard, Piece, Player } from '../types';
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
          const icon = pieceIconMap.get(piece.pieceIdentifier);
          return (
            <div key={uid(piece)} className="icon-wrapper">
              <FontAwesomeIcon icon={icon} className={piece.owner === Player.dark ? 'dark-piece' : 'light-piece'} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default GraveyardYard;
