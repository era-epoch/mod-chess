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
  const player = useSelector((state: RootState) => state.ui.player);
  const otherPlayers = useSelector((state: RootState) => state.ui.otherPlayers);
  return (
    <div className="game-area-info">
      <InfoTitle />
      <TurnCounter />
      <ChatBox />
      <ChatBoxInput />
      <div className="player-infos">
        <div>
          <PlayerInfo user={player} />
        </div>
        {otherPlayers.map((p: UserInfo) => {
          return (
            <div key={uid(p)}>
              <PlayerInfo user={p} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameAreaInfo;
