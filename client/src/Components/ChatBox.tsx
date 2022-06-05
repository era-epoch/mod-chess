import { useSelector } from 'react-redux';
import { uid } from 'react-uid';
import { RootState } from '../state/rootReducer';
import { ChatItem } from '../state/slices/ui/slice';
import './ChatBox.css';

const ChatBox = (): JSX.Element => {
  const chatlog = useSelector((state: RootState) => state.ui.chatlog);
  return (
    <div className="chat-box">
      {chatlog.map((item: ChatItem) => {
        return (
          <div key={uid(item)} className="chat-item">
            <div className="chat-time">{`${('0' + item.time.getHours()).slice(-2)}:${(
              '0' + item.time.getMinutes()
            ).slice(-2)}:${('0' + item.time.getSeconds()).slice(-2)}`}</div>
            <div className="chat-origin">{item.origin}</div>
            <div className="chat-content">{item.content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
