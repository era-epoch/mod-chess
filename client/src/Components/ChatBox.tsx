import { useSelector } from 'react-redux';
import { uid } from 'react-uid';
import { RootState } from '../state/rootReducer';
import { ChatItem } from '../state/slices/ui/slice';
import './ChatBox.css';

const ChatBox = (): JSX.Element => {
  const chatlog = useSelector((state: RootState) => state.ui.chatlog);
  return (
    <div className="chat-box">
      <div className="chat-box-main">
        {chatlog.map((item: ChatItem) => {
          return (
            <div key={uid(item)} className="chat-item">
              <div className="chat-time">{`${item.time.getHours()}:${item.time.getMinutes()}:${item.time.getSeconds()}`}</div>
              <div className="chat-content">{item.content}</div>
              <div className="chat-origin">{item.origin}</div>
            </div>
          );
        })}
      </div>
      <div className="chat-box-input"></div>
    </div>
  );
};

export default ChatBox;
