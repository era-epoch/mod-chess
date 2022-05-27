import './LeftBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBucket, faComputer, faLocationDot, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setActiveGame } from '../state/slices/ui/slice';
import { setBoard } from '../state/slices/game/slice';
import localBoard from '../GameObjects/boards/localBoard';
import { wsCreateGame, wsJoinGame } from '../socket';

export const ws_url = `http://${window.location.hostname}:5000`;

const LeftBar = (): JSX.Element => {
  const dispatch = useDispatch();
  const startLocalGame = () => {
    dispatch(setActiveGame(true));
    dispatch(setBoard(localBoard));
  };

  const createOnlineGame = () => {
    dispatch(wsCreateGame(ws_url));
  };

  const joinOnlineGame = () => {
    dispatch(wsJoinGame(ws_url));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <p>mod-chess.com</p>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu-option">
          <div className="accordion-title">
            <FontAwesomeIcon icon={faComputer} />
            <p>Play vs CPU</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="sidebar-menu-option" onClick={createOnlineGame}>
          <div className="accordion-title">
            <FontAwesomeIcon icon={faNetworkWired} />
            <p>Create Online Game</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="sidebar-menu-option" onClick={joinOnlineGame}>
          <div className="accordion-title">
            <FontAwesomeIcon icon={faNetworkWired} />
            <p>Join Online Game</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="sidebar-menu-option" onClick={startLocalGame}>
          <div className="accordion-title">
            <FontAwesomeIcon icon={faLocationDot} />
            <p>Play Locally</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="sidebar-menu-option">
          <div className="accordion-title">
            <FontAwesomeIcon icon={faBucket} />
            <p>Sandbox</p>
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
      </div>
      <div className="sidebar-footer"></div>
    </div>
  );
};

export default LeftBar;
