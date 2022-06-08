import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { wsJoinGame } from '../../../socketMiddleware';
import { toggleJoinGameMenu } from '../../../state/slices/ui/slice';
import { ws_url } from '../../LeftBar/LeftBar';
import './JoinMenu.css';

const JoinMenu = (): JSX.Element => {
  const dispatch = useDispatch();
  const [gameId, setGameId] = useState('');
  const joinOnlineGame = () => {
    dispatch(wsJoinGame(ws_url, gameId));
    dispatch(toggleJoinGameMenu(false));
  };
  return (
    <div className="menu-wrapper">
      <p>JOIN</p>
      <input
        className="game-name"
        type="text"
        value={gameId}
        onChange={(event) => setGameId(event.target.value)}
      ></input>
      <p>Your name:</p>
      <div className="ui-button major-button join-game-button" onClick={joinOnlineGame}>
        Join Game
      </div>
    </div>
  );
};

export default JoinMenu;
