import { useSelector } from 'react-redux';
import { RootState } from '../../../../state/rootReducer';
import './TurnCounter.css';

const TurnCounter = (): JSX.Element => {
  const turn = useSelector((state: RootState) => state.game.turn);
  const winner = useSelector((state: RootState) => state.game.winner);

  return (
    <div className="turn-counter">
      <div className="turn-number-label">Turn {turn}</div>
      {winner !== null ? (
        <>
          <div className="turn-player-label">
            {winner === 0 ? 'White Wins!' : winner === 1 ? 'Black Wins!' : 'Draw'}
          </div>
        </>
      ) : (
        <div className="turn-player-label">{turn % 2 === 0 ? 'White to move.' : 'Black to move.'}</div>
      )}
    </div>
  );
};

export default TurnCounter;
