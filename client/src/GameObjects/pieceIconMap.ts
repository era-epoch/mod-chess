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
  [PieceIdentifier.scourgePawn, faChessPawn],
  [PieceIdentifier.scourgeRook, faChessRook],
  [PieceIdentifier.scourgeKnight, faChessKnight],
  [PieceIdentifier.scourgeBishop, faChessBishop],
  [PieceIdentifier.scourgeQueen, faChessQueen],
  [PieceIdentifier.scourgeKing, faChessKing],
]);

export default pieceIconMap;
