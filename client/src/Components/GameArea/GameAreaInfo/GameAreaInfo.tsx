import { useSelector } from 'react-redux';
import { uid } from 'react-uid';
import { RootState } from '../../../state/rootReducer';
import { UserInfo } from '../../../types';
import ChatBox from './ChatBox/ChatBox';
import ChatBoxInput from './ChatBoxInput/ChatBoxInput';
import './GameAreaInfo.css';
import InfoTitle from './InfoTitle/InfoTitle';
import PlayerInfo from './PlayerInfo/PlayerInfo';
import TurnCounter from './TurnCounter/TurnCounter';

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
