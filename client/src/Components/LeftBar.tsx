import { useEffect, useState } from 'react';
import './LeftBar.css';
import { IMessageEvent, w3cwebsocket } from 'websocket';

const client = new w3cwebsocket('ws://localhost:5000/websockets?userId=123');

const LeftBar = (): JSX.Element => {
  const [websocketConnected, setWebsocketConnected] = useState(false);
  const [message, setMessage] = useState('Default');

  useEffect(() => {
    client.onopen = () => {
      console.log('Websocket Connection Open');
      setWebsocketConnected(true);
    };
    client.onmessage = (message: IMessageEvent) => {
      setMessage(JSON.parse(message.data.toString()).message);
    };
  }, []);

  useEffect(() => {
    if (websocketConnected) client.send(JSON.stringify({ msg: 'hi' }));
  }, [websocketConnected]);

  return <div className="left-sidebar">{message}</div>;
};

export default LeftBar;
