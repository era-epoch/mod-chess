import CenterGameArea from './CenterGameArea';
import './GameArea.css';
import LeftGameArea from './LeftGameArea';
import RightGameArea from './RightGameArea';

const GameArea = (): JSX.Element => {
  return (
    <div className="game-area">
      <RightGameArea />
      <CenterGameArea />
      <LeftGameArea />
    </div>
  );
};

export default GameArea;
