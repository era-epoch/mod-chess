import './RightGameArea.css';
import GraveyardYard from './GraveyardYard';
import { useSelector } from 'react-redux';
import { Graveyard } from '../types';
import { RootState } from '../state/rootReducer';

const RightGameArea = (): JSX.Element => {
  const graveyards = useSelector((state: RootState) => state.game.graveyards);
  return (
    <div className="right-game-area">
      <div className="right-game-area-top">
        <div className="player-name">
          <p>Player 1</p>
        </div>
      </div>
      <div className="right-game-area-center">
        {graveyards.map((graveyard: Graveyard) => {
          return <GraveyardYard graveyard={graveyard} />;
        })}
      </div>
      <div className="right-game-area-bottom">
        <div className="player-name">
          <p>Player 2</p>
        </div>
      </div>
    </div>
  );
};

export default RightGameArea;
