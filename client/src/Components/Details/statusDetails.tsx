import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PieceStatus } from '../../types';
import './details.css';

const poisoned = (): JSX.Element => {
  return (
    <div className="detail text-detail">
      <div className="detail-section">
        <FontAwesomeIcon icon={faSkullCrossbones} className="detail-icon poison" />
        <span className="detail-title">Poisoned: </span>
        <span className="detail-info">
          If a piece has 3 stacks of <span className="emph poison-text">poisoned</span> at the end of a turn, it dies.
        </span>
      </div>
    </div>
  );
};

export const statusInfoMap = new Map<PieceStatus, React.FC[]>([[PieceStatus.PSN, [poisoned]]]);
