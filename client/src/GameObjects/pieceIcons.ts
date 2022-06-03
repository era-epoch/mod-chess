import { PieceIdentifier } from '../types';
import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from '@fortawesome/free-solid-svg-icons';

const pieceIconMap = new Map<PieceIdentifier, any>([
  [PieceIdentifier.emptyBasic, null],
  [PieceIdentifier.pawnBasic, faChessPawn],
  [PieceIdentifier.rookBasic, faChessRook],
  [PieceIdentifier.knightBasic, faChessKnight],
  [PieceIdentifier.bishopBasic, faChessBishop],
  [PieceIdentifier.queenBasic, faChessQueen],
  [PieceIdentifier.kingBasic, faChessKing],
]);

export default pieceIconMap;
