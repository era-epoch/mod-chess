import { faBolt, faChessPawn, faCircle, faCrown, faHeart, faSkull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/rootReducer';
import { PieceStatus, SquareContents, SquareStatus } from '../../types';
import BoardPiece from '../Piece/Piece';
import './Square.css';

interface Props {
  content: SquareContents;
  clickHandler: Function;
}

const Square = (props: Props): JSX.Element => {
  const activeAbility = useSelector((state: RootState) => state.game.activeAbility);
  return (
    <div
      className={
        `square ${props.content.inBounds ? 'active-square' : 'inactive-square'}` +
        `${(props.content.row + props.content.col) % 2 === 0 ? ' light-square' : ' dark-square'}` +
        ` ${props.content.inBounds ? activeAbility : ''}`
      }
      onClick={() => props.clickHandler(props.content.row, props.content.col)}
    >
      <div className={`icon-stack`}>
        {props.content ? <BoardPiece piece={props.content.piece} /> : null}
        {props.content.squareStatuses.includes(SquareStatus.HL) ? (
          <div className="icon-wrapper square-highlighted">
            <FontAwesomeIcon icon={faCircle} />
          </div>
        ) : null}
        {props.content.squareStatuses.includes(SquareStatus.HLC) ? (
          <div className="icon-wrapper square-highlighted">
            <FontAwesomeIcon icon={faCrown} />
          </div>
        ) : null}
        {props.content.squareStatuses.includes(SquareStatus.HLK) ? (
          <div className="icon-wrapper square-highlighted-kill">
            <FontAwesomeIcon icon={faSkull} />
          </div>
        ) : null}
        {props.content.squareStatuses.includes(SquareStatus.EPV) ? (
          <div className={`icon-wrapper en-passant-vulnerable`}>
            <FontAwesomeIcon icon={faChessPawn} />
          </div>
        ) : null}
        {props.content.inBounds && props.content.squareStatuses.includes(SquareStatus.SEL) ? (
          <div className="square-selected"></div>
        ) : null}
        {props.content.inBounds && props.content.squareStatuses.includes(SquareStatus.RUNE) ? (
          <div className={`icon-wrapper board-rune`}>
            <FontAwesomeIcon icon={faBolt} />
          </div>
        ) : null}
        {props.content.inBounds &&
        activeAbility === 'ability-cure' &&
        props.content.piece.statuses.includes(PieceStatus.PSN) ? (
          <div className={`icon-wrapper hover-icon heart`}>
            <FontAwesomeIcon icon={faHeart} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Square;
