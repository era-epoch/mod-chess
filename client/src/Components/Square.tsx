import { faChessPawn, faCircle, faCrown, faSkull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pieceIconMap from '../GameObjects/pieceIconMap';
import { Player, SquareContents, SquareStatus } from '../types';
import './Square.css';

interface Props {
  content: SquareContents;
  clickHandler: Function;
}

const Square = (props: Props): JSX.Element => {
  // let statusClasses = '';
  // props.content.squareStatuses.forEach((s) => {
  //   statusClasses += s + ' ';
  // })

  const icon = pieceIconMap.get(props.content.piece.pieceIdentifier);

  return (
    <div
      className={
        `square ${props.content.inBounds ? 'active-square' : 'inactive-square'}` +
        `${(props.content.row + props.content.col) % 2 === 0 ? ' light-square' : ' dark-square'}`
      }
      onClick={() => props.clickHandler(props.content.row, props.content.col)}
    >
      <div className={`icon-stack`}>
        {props.content && icon ? (
          <div className="icon-wrapper">
            <FontAwesomeIcon
              icon={icon}
              className={props.content.piece.owner === Player.dark ? 'dark-piece' : 'light-piece'}
            />
          </div>
        ) : null}
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
