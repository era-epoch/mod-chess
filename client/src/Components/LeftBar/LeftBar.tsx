import './LeftBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBucket,
  faComputer,
  faHome,
  faLocationDot,
  faNetworkWired,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import {
  addChatItemToLog,
  addPlayer,
  ChatItem,
  ChatItemType,
  clearPlayers,
  closeAllMenus,
  toggleActiveGame,
  toggleCreateGameMenu,
  toggleJoinGameMenu,
  updatePlayer,
} from '../../state/slices/ui/slice';
import { fullGameStateUpdate, GameState, setUpGame } from '../../state/slices/game/slice';
import testBoard from '../../GameObjects/boards/testBoard';
import { wsDisconnect } from '../../socketMiddleware';
import { PlayerColour } from '../../types';
import produce from 'immer';
import { useCallback, useEffect } from 'react';
import localBoard from '../../GameObjects/boards/localBoard';

export const ws_url = `http://${window.location.hostname}:5000`;

const LeftBar = (): JSX.Element => {
  const dispatch = useDispatch();
  const startLocalGame = useCallback(() => {
    dispatch(toggleActiveGame(true));
    dispatch(clearPlayers());
    dispatch(
      updatePlayer({
        colour: PlayerColour.light,
        id: 'light',
        name: 'Light',
      }),
    );
    dispatch(
      addPlayer({
        colour: PlayerColour.dark,
        id: 'dark',
        name: 'Dark',
      }),
    );
    dispatch(
      fullGameStateUpdate({
        board: produce(testBoard, () => {}),
        turn: 0,
        selectedRow: null,
        selectedCol: null,
        graveyards: [
          { player: PlayerColour.light, contents: [] },
          { player: PlayerColour.dark, contents: [] },
        ],
        lightRunes: 0,
        darkRunes: 2, // Dark starts with 2 rune to balance going 2nd
        winner: null,
        creatorColour: null,
        timedGame: false,
        gameTime: 0,
        turnTimeBack: 0,
        moveHistory: [],
        lightRuneSpawns: 1,
        darkRuneSpawns: 1,
        runeDuration: Infinity,
        runeSpawnTurn: 0,
        activeAbility: '',
        abilityActivatedFlag: false,
      } as GameState),
    );
    dispatch(
      addChatItemToLog({
        content: "You've started a new local game!",
        time: new Date(),
        origin: '',
        type: ChatItemType.GAME,
      } as ChatItem),
    );
    dispatch(setUpGame());
  }, [dispatch]);

  const handleHomeClicked = () => {
    dispatch(wsDisconnect(ws_url));
    dispatch(closeAllMenus());
  };

  const handleCPUClicked = () => {};

  const handleCreateOnlineClicked = () => {
    dispatch(toggleCreateGameMenu());
  };

  const handleJoinOnlineClicked = () => {
    dispatch(toggleJoinGameMenu());
  };

  const handleCreateLocalClicked = () => {
    // dispatch(toggleCreateLocalGameMenu());
    startLocalGame();
  };

  useEffect(() => {
    startLocalGame();
  }, [startLocalGame]);

  return (
    <div className="sidebar">
      <div className="sidebar-header"></div>
      <div className="sidebar-body">
        <div className="sidebar-menu-option" onClick={handleHomeClicked}>
          <div className="accordion-title">
            <div className="sidebar-icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <p>Home</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="sidebar-menu-option" onClick={handleCPUClicked}>
          <div className="accordion-title">
            <div className="sidebar-icon">
              <FontAwesomeIcon icon={faComputer} />
            </div>
            <p>Play vs CPU</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="sidebar-menu-option" onClick={handleCreateOnlineClicked}>
          <div className="accordion-title">
            <div className="sidebar-icon">
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
            <p>Create Online Game</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="sidebar-menu-option" onClick={handleJoinOnlineClicked}>
          <div className="accordion-title">
            <div className="sidebar-icon">
              <FontAwesomeIcon icon={faNetworkWired} />
            </div>
            <p>Join Online Game</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="sidebar-menu-option" onClick={handleCreateLocalClicked}>
          <div className="accordion-title">
            <div className="sidebar-icon">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <p>Play Locally</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="sidebar-menu-option">
          <div className="accordion-title">
            <div className="sidebar-icon">
              <FontAwesomeIcon icon={faBucket} />
            </div>
            <p>Sandbox</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
      </div>
      <div className="sidebar-footer">
        <p>mod-chess.com</p>
      </div>
    </div>
  );
};

export default LeftBar;
