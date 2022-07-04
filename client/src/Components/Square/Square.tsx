import { faChessPawn, faCircle, faCrown, faSkull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SquareContents, SquareStatus } from '../../types';
import BoardPiece from '../Piece/Piece';
import './Square.css';

interface Props {
  content: SquareContents;
  clickHandler: Function;
}

const Square = (props: Props): JSX.Element => {
  return (
    <div
      className={
        `square ${props.content.inBounds ? 'active-square' : 'inactive-square'}` +
        `${(props.content.row + props.content.col) % 2 === 0 ? ' light-square' : ' dark-square'}`
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
      </div>
    </div>
  );
};

export default Square;
