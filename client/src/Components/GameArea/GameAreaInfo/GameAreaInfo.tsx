import { useSelector } from 'react-redux';
import { uid } from 'react-uid';
import { RootState } from '../../../state/rootReducer';
import { UserInfo } from '../../../types';
import ChatBox from './ChatBox/ChatBox';
import ChatBoxInput from './ChatBoxInput/ChatBoxInput';
import './GameAreaInfo.css';
import InfoTitle from './InfoTitle/InfoTitle';
import Inspector from './Inspector/Inspector';
import PlayerInfo from './PlayerInfo/PlayerInfo';
import TurnCounter from './TurnCounter/TurnCounter';

const GameAreaInfo = (): JSX.Element => {
  const player = useSelector((state: RootState) => state.ui.player);
  const otherPlayers = useSelector((state: RootState) => state.ui.otherPlayers);
  const allPlayers = otherPlayers.slice(0);
  allPlayers.push(player);
  allPlayers.sort((a, b) => a.colour - b.colour);
  return (
    <div className="game-area-info">
      {/* <InfoTitle /> */}
      <TurnCounter />
      <Inspector />
      <ChatBox />
      <ChatBoxInput />
      <div className="player-infos">
        {allPlayers.map((p: UserInfo) => {
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
