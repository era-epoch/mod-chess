import { faChessPawn } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/rootReducer';
import { UserInfo, Graveyard, Player } from '../../../../types';
import GraveyardYard from '../GraveyardYard/GraveyardYard';
import './PlayerInfo.css';

interface Props {
  user: UserInfo;
}

const PlayerInfo = (props: Props): JSX.Element => {
  const graveyards = useSelector((state: RootState) => state.game.graveyards);
  const graveyard = graveyards.filter((g: Graveyard) => g.player === props.user.colour)[0];
  return (
    <div className="player-info">
      <div style={{ color: props.user.colour === Player.light ? 'white' : 'black' }}>
        <FontAwesomeIcon icon={faChessPawn} />
      </div>
      <div className="player-name">{props.user.name}</div>
      <GraveyardYard graveyard={graveyard} />
    </div>
  );
};

export default PlayerInfo;
