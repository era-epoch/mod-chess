import { useSelector } from 'react-redux';
import { RootState } from '../state/rootReducer';
import './ChatBox.css';

const ChatBox = (): JSX.Element => {
  const gameId = useSelector((state: RootState) => state.ui.gameID);
  return <div className="chat-box">{gameId}</div>;
};

export default ChatBox;
