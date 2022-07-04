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
  [PieceIdentifier.empty, null],
  [PieceIdentifier.basicPawn, faChessPawn],
  [PieceIdentifier.basicRook, faChessRook],
  [PieceIdentifier.basicKnight, faChessKnight],
  [PieceIdentifier.basicBishop, faChessBishop],
  [PieceIdentifier.basicQueen, faChessQueen],
  [PieceIdentifier.basicKing, faChessKing],
]);

export default pieceIconMap;
