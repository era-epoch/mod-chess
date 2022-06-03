import { useSelector } from 'react-redux';
import { RootState } from '../state/rootReducer';
import './Base.css';
import GameArea from './GameArea';
import LeftBar from './LeftBar';

const Base = (): JSX.Element => {
  const activeGame = useSelector((state: RootState) => state.ui.activeGame);
  return (
    <div className="base">
      <LeftBar />
      {activeGame ? <GameArea /> : null}
    </div>
  );
};

export default Base;
