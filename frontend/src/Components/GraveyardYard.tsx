import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Graveyard, Piece, Player } from '../types';
import './GraveyardYard.css';

interface Props {
  graveyard: Graveyard;
}

const GraveyardYard = (props: Props): JSX.Element => {
  return (
    <div className="graveyard">
      {props.graveyard.contents.map((piece: Piece) => {
        return (
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={piece.icon} className={piece.owner === Player.dark ? 'dark-piece' : 'light-piece'} />
          </div>
        );
      })}
    </div>
  );
};

export default GraveyardYard;
