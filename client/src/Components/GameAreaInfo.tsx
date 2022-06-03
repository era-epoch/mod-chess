import { useSelector } from 'react-redux';
import { uid } from 'react-uid';
import { RootState } from '../state/rootReducer';
import { UserInfo } from '../types';
import ChatBox from './ChatBox';
import ChatBoxInput from './ChatBoxInput';
import './GameAreaInfo.css';
import InfoTitle from './InfoTitle';
import PlayerInfo from './PlayerInfo';
import TurnCounter from './TurnCounter';

const GameAreaInfo = (): JSX.Element => {
  const players = useSelector((state: RootState) => state.ui.players);
  return (
    <div className="game-area-info">
      <InfoTitle />
      <TurnCounter />
      <ChatBox />
      <ChatBoxInput />
      <div className="player-infos">
        {players.map((player: UserInfo) => {
          return (
            <div key={uid(player)}>
              <PlayerInfo user={player} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameAreaInfo;
