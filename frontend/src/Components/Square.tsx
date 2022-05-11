import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Owner, SquareContents } from '../types';
import './Square.css';

interface Props {
  row: number,
  col: number,
  status: number,
  content: SquareContents|null,
}

const Square = (props: Props): JSX.Element => {
  console.log(props.content);

  return (
    <div className={`square ${props.status ? 'active-square' : 'inactive-square'}`
    + `${(props.row + props.col)%2 === 0 ? ' light-square' : ' dark-square'}`}>
      {props.content && props.content.icon? 
      <div className={`icon-wrapper ${props.content.owner === Owner.dark ? 'dark-piece' : 'light-piece'}`}>
        <FontAwesomeIcon icon={props.content.icon} />
      </div> 
      : null }
    </div>
  )
}

export default Square;