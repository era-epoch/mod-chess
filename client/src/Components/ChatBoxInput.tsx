import { useState } from 'react';
import './ChatBoxInput.css';

const ChatBoxInput = (): JSX.Element => {
  const [chatMessage, setChatMessage] = useState('');
  return (
    <div className="chat-box-input">
      <input type="text" value={chatMessage} onChange={(event) => setChatMessage(event.target.value)}></input>
    </div>
  );
};

export default ChatBoxInput;
