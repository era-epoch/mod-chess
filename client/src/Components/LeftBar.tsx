import './LeftBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBucket, faComputer, faLocationDot, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

const LeftBar = (): JSX.Element => {
  return (
    <div className="left-sidebar">
      <div className="left-header">
        <p>mod-chess.com</p>
      </div>
      <div className="left-body">
        <div className="left-menu-option">
          <div className="accordion-title">
            <p>Play vs CPU</p>
            <FontAwesomeIcon icon={faComputer} />
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="left-menu-option">
          <div className="accordion-title">
            <p>Play Online</p>
            <FontAwesomeIcon icon={faNetworkWired} />
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="left-menu-option">
          <div className="accordion-title">
            <p>Play Local</p>
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
        <div className="left-menu-option">
          <div className="accordion-title">
            <p>Sandbox</p>
            <FontAwesomeIcon icon={faBucket} />
          </div>
          <div className="accordion-underline"></div>
          <div className="accordion-content"></div>
        </div>
      </div>
      <div className="left-footer"></div>
    </div>
  );
};

export default LeftBar;
