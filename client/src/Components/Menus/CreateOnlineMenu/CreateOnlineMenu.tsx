import produce from 'immer';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateGameEvent } from '../../../../../ws/events';
import localBoard from '../../../GameObjects/boards/localBoard';
import { wsCreateGame } from '../../../socketMiddleware';
import { toggleCreateGameMenu } from '../../../state/slices/ui/slice';
import { PlayerColour } from '../../../types';
import { ws_url } from '../../LeftBar/LeftBar';
import './CreateOnlineMenu.css';

const CreateOnlineMenu = (): JSX.Element => {
  const [creatorColour, setCreatorColour] = useState<PlayerColour>(PlayerColour.random);
  const [timedGame, setTimedGame] = useState(false);
  const [gameTime, setGameTime] = useState(10);
  const [playerName, setPlayerName] = useState('Player' + Math.random().toString().slice(-4, -1));
  const dispatch = useDispatch();

  const createOnlineGame = () => {
    dispatch(
      wsCreateGame(ws_url, {
        game: {
          board: produce(localBoard, () => {}),
          turn: 0,
          selectedRow: null,
          selectedCol: null,
          graveyards: [
            { player: PlayerColour.light, contents: [] },
            { player: PlayerColour.dark, contents: [] },
          ],
          lightRunes: 0,
          darkRunes: 0,
          winner: null,
          creatorColour: creatorColour,
          timedGame: timedGame,
          gameTime: gameTime,
          turnTimeBack: 1,
          moveHistory: [],
          lightRuneSpawns: 0,
          darkRuneSpawns: 0,
          runeDuration: 0,
          runeSpawnTurn: 0,
        },
        playerName: playerName,
      } as CreateGameEvent),
    );
    dispatch(toggleCreateGameMenu());
  };

  const handleCreatorColourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case 'light':
        setCreatorColour(PlayerColour.light);
        break;
      case 'dark':
        setCreatorColour(PlayerColour.dark);
        break;
      default:
        setCreatorColour(PlayerColour.random);
    }
  };

  const handleGameTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case 'none':
        setTimedGame(false);
        break;
      case '10':
        setTimedGame(true);
        setGameTime(10);
        break;
      case '5':
        setTimedGame(true);
        setGameTime(5);
        break;
      case '3':
        setTimedGame(true);
        setGameTime(3);
        break;
      case '1':
        setTimedGame(true);
        setGameTime(1);
        break;
    }
  };

  const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  return (
    <div className="menu-wrapper">
      <p>CREATE ONLINE GAME</p>
      <div className="menu-section player-name-select">
        <div className="menu-section-title">Your Name</div>
        <input type="text" value={playerName} onChange={handlePlayerNameChange} />
      </div>
      <div className="menu-section creator-player-select" onChange={handleCreatorColourChange}>
        <div className="menu-section-title">Your Colour</div>
        <div className="menu-row">
          <div>
            <input type="radio" name="creator-player" value="light" id="creator-player-light" />
            <label htmlFor="creator-player-light">Light</label>
          </div>
          <div>
            <input type="radio" name="creator-player" value="dark" id="creator-player-dark" />
            <label htmlFor="creator-player-dark">Dark</label>
          </div>
          <div>
            <input type="radio" name="creator-player" value="random" id="creator-player-random" defaultChecked />
            <label htmlFor="creator-player-random">Random</label>
          </div>
        </div>
      </div>
      <div className="menu-section game-time-select" onChange={handleGameTimeChange}>
        <div className="menu-section-title">Game Time (per player)</div>
        <div className="menu-row">
          <div>
            <input type="radio" name="game-time" value="none" id="game-time-none" />
            <label htmlFor="game-time-none">No time limit</label>
          </div>
          <div>
            <input type="radio" name="game-time" value="10" id="game-time-10" />
            <label htmlFor="game-time-10">10 minutes</label>
          </div>
          <div>
            <input type="radio" name="game-time" value="5" id="game-time-5" />
            <label htmlFor="game-time-5">5 minutes</label>
          </div>
          <div>
            <input type="radio" name="game-time" value="3" id="game-time-3" />
            <label htmlFor="game-time-3">3 minutes</label>
          </div>
          <div>
            <input type="radio" name="game-time" value="1" id="game-time-1" />
            <label htmlFor="game-time-1">1 minute</label>
          </div>
        </div>
      </div>
      <div className="ui-button major-button create-game-button" onClick={createOnlineGame}>
        Create Game
      </div>
    </div>
  );
};

export default CreateOnlineMenu;
