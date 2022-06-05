import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './ChatBoxInput.css';

const ChatBoxInput = (): JSX.Element => {
  const dispatch = useDispatch();
  const [chatMessage, setChatMessage] = useState('');

  const handleSubmit = () => {};

  return (
    <div className="chat-box-input">
      <input type="text" value={chatMessage} onChange={(event) => setChatMessage(event.target.value)}></input>
    </div>
  );
};

export default ChatBoxInput;
