import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { wsCreateGame } from '../../../socketMiddleware';
import { toggleCreateGameMenu } from '../../../state/slices/ui/slice';
import { ws_url } from '../../LeftBar/LeftBar';
import './CreateOnlineMenu.css';

const CreateOnlineMenu = (): JSX.Element => {
  const dispatch = useDispatch();
  const createOnlineGame = () => {
    dispatch(wsCreateGame(ws_url));
    dispatch(toggleCreateGameMenu(false));
  };
  return (
    <div className="menu-wrapper">
      <p>CREATE ONLINE GAME</p>
      <div className="ui-button major-button create-game-button" onClick={createOnlineGame}>
        Create Game
      </div>
    </div>
  );
};

export default CreateOnlineMenu;
