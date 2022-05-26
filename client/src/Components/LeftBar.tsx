import './LeftBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBucket, faComputer, faLocationDot, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setActiveGame } from '../state/slices/ui/slice';

const LeftBar = (): JSX.Element => {
  const dispatch = useDispatch();
  const startLocalGame = () => {
    dispatch(setActiveGame(true));
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
        <div className="sidebar-menu-option">
          <div className="accordion-title">
            <FontAwesomeIcon icon={faNetworkWired} />
            <p>Play Online</p>
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
