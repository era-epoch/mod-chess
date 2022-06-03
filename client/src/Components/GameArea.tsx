import './GameArea.css';
import GameAreaMain from './GameAreaMain';
import GameAreaInfo from './GameAreaInfo';

const GameArea = (): JSX.Element => {
  return (
    <div className="game-area">
      {/* <GameAreaStatus /> */}
      <GameAreaMain />
      <GameAreaInfo />
    </div>
  );
};

export default GameArea;
