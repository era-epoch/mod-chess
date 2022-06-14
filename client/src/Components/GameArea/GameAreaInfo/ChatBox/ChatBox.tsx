import { useSelector } from 'react-redux';
import { uid } from 'react-uid';
import { RootState } from '../../../../state/rootReducer';
import { ChatItem } from '../../../../state/slices/ui/slice';
import './ChatBox.css';

const ChatBox = (): JSX.Element => {
  const chatlog = useSelector((state: RootState) => state.ui.chatlog);
  const moveHistory = useSelector((state: RootState) => state.game.moveHistory);
  const allChat: ChatItem[] = [];
  allChat.push(...chatlog);
  allChat.push(...moveHistory);
  allChat.sort((a, b) => (a.time < b.time ? -1 : b.time < a.time ? 1 : 0));
  return (
    <div className="chat-box">
      {allChat.map((item: ChatItem) => {
        // TODO: Why is the deserialization necessary?
        const time = new Date(item.time);
        return (
          <div key={uid(item)} className="chat-item">
            <div className="chat-time">{`${('0' + time.getHours()).slice(-2)}:${('0' + time.getMinutes()).slice(-2)}:${(
              '0' + time.getSeconds()
            ).slice(-2)}`}</div>
            <div className="chat-origin">{item.origin}</div>
            <div className="chat-content">{item.content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
