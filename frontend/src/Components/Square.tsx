import { faCircle, faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Owner, SquareContents, SquareStatus } from '../types';
import './Square.css';

interface Props {
  listener: boolean,
  row: number,
  col: number,
  content: SquareContents,
  gameState: (SquareContents)[][],
  clickHandler: Function,
}

const Square = (props: Props): JSX.Element => {
  let statusClasses = '';
  props.content.squareStatuses.forEach((s) => {
    statusClasses += s + ' ';
  })

  return (
    <div className={`square ${props.content.inBounds ? 'active-square' : 'inactive-square'}`
    + `${(props.row + props.col)%2 === 0 ? ' light-square' : ' dark-square'}`} onMouseDown={
      () => props.clickHandler(props.row, props.col)
      }>
      <div className={`icon-stack`}>
        {props.content && props.content.piece.icon? 
          <div className='icon-wrapper'>
            <FontAwesomeIcon icon={props.content.piece.icon} className={props.content.piece.owner === Owner.dark ? 'dark-piece' : 'light-piece'} />
          </div>
        : null }
        {props.content.squareStatuses.has(SquareStatus.HL)? 
          <div className='icon-wrapper square-highlighted'>
            <FontAwesomeIcon icon={faCircle} /> 
          </div>
        : null}
        {props.content.squareStatuses.has(SquareStatus.HLC)? 
          <div className='icon-wrapper square-highlighted'>
            <FontAwesomeIcon icon={faCrown} /> 
          </div>
        : null}
        {props.content.squareStatuses.has(SquareStatus.SEL)?
          <div className='square-selected'>
          </div>
        : null}
      </div>
    </div>
  )
}

export default Square;