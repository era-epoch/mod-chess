import './GameAreaStatus.css';
import GraveyardYard from './GraveyardYard';
import { useSelector } from 'react-redux';
import { Graveyard, Player } from '../types';
import { RootState } from '../state/rootReducer';
import TurnCounter from './TurnCounter';

const GameAreaStatus = (): JSX.Element => {
  const graveyards = useSelector((state: RootState) => state.game.graveyards);
  const darkGraveyard = graveyards.filter((g: Graveyard) => g.player === Player.dark)[0];
  const lightGraveyard = graveyards.filter((g: Graveyard) => g.player === Player.light)[0];

  return (
    <div className="game-area-status">
      <div className="game-area-status-top">
        <div className="player-name">
          <p>Black</p>
        </div>
      </div>
      <div className="game-area-status-center">
        <GraveyardYard graveyard={darkGraveyard} />
        <TurnCounter />
        <GraveyardYard graveyard={lightGraveyard} />
      </div>
      <div className="game-area-status-bottom">
        <div className="player-name">
          <p>White</p>
        </div>
      </div>
    </div>
  );
};

export default GameAreaStatus;
