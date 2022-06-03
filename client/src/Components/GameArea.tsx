import './GameArea.css';
import GameAreaMain from './GameAreaMain';
import GameAreaChat from './GameAreaChat';

const GameArea = (): JSX.Element => {
  return (
    <div className="game-area">
      {/* <GameAreaStatus /> */}
      <GameAreaMain />
      <GameAreaChat />
    </div>
  );
};

export default GameArea;
