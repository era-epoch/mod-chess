import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { wsJoinGame } from '../../../socketMiddleware';
import { toggleJoinGameMenu } from '../../../state/slices/ui/slice';
import { ws_url } from '../../LeftBar/LeftBar';
import './JoinMenu.css';

const JoinMenu = (): JSX.Element => {
  const dispatch = useDispatch();
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('Player' + Math.random().toString().slice(-4, -1));

  const joinOnlineGame = () => {
    dispatch(
      wsJoinGame(ws_url, {
        id: gameId,
        playerName: playerName,
      }),
    );
    dispatch(toggleJoinGameMenu(false));
  };

  const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
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
      <div className="menu-section player-name-select">
        <div className="menu-section-title">Your Name</div>
        <input type="text" value={playerName} onChange={handlePlayerNameChange} />
      </div>
      <div className="ui-button major-button join-game-button" onClick={joinOnlineGame}>
        Join Game
      </div>
    </div>
  );
};

export default JoinMenu;
