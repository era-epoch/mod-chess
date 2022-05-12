import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Owner, Piece, SquareContents, SquareStatus } from '../types';
import './Square.css';

interface Props {
  listener: boolean,
  row: number,
  col: number,
  content: Piece|null,
  statuses: Set<SquareStatus>,
  gameState: (SquareContents|null)[][],
  clickHandler: Function,
}

const Square = (props: Props): JSX.Element => {
  let statusClasses = '';
  props.statuses.forEach((s) => {
    statusClasses += s + ' ';
  })

  return (
    <div className={`square ${props.content !== null ? 'active-square' : 'inactive-square'} ${statusClasses}`
    + `${(props.row + props.col)%2 === 0 ? ' light-square' : ' dark-square'}`} onClick={
      () => props.clickHandler(props.row, props.col, props.gameState)
      }>
      <div className={`icon-wrapper`}>
        {props.content && props.content.icon? 
          <FontAwesomeIcon icon={props.content.icon} className={props.content.owner === Owner.dark ? 'dark-piece' : 'light-piece'} />
        : null }
        {props.statuses.has(SquareStatus.HL)? 
          <div className='square-highlighted'>
            <FontAwesomeIcon icon={faCircle} /> 
          </div>
        : null}
      </div> 
    </div>
  )
}

export default Square;