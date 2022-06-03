import './GameArea.css';
import GameAreaMain from './GameAreaMain';
import GameAreaChat from './GameAreaChat';
import GameAreaStatus from './GameAreaStatus';

const GameArea = (): JSX.Element => {
  return (
    <div className="game-area">
      <GameAreaStatus />
      <GameAreaMain />
      <GameAreaChat />
    </div>
  );
};

export default GameArea;
