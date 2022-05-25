import { useEffect, useState } from 'react';
import './LeftBar.css';
import { IMessageEvent, w3cwebsocket } from 'websocket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessPawn, faComputer, faHome, faLocationDot, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const client = new w3cwebsocket('ws://localhost:5000/websockets?userId=123');

const LeftBar = (): JSX.Element => {
  const [websocketConnected, setWebsocketConnected] = useState(false);
  const navigate = useNavigate();

  const onHomeClicked = () => {
    navigate('/');
  };

  useEffect(() => {
    client.onopen = () => {
      console.log('Websocket Connection Open');
      setWebsocketConnected(true);
    };
    client.onmessage = (message: IMessageEvent) => {
      console.log(JSON.parse(message.data.toString()).message);
    };
  }, []);

  useEffect(() => {
    if (websocketConnected) client.send(JSON.stringify({ msg: 'hi' }));
  }, [websocketConnected]);

  return (
    <div className="left-sidebar">
      {/* <div className="home-button" onClick={onHomeClicked}>
        <FontAwesomeIcon icon={faHome} />
      </div> */}
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
      </div>
      <div className="left-footer"></div>
    </div>
  );
};

export default LeftBar;
