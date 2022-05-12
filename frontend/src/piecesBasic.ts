import { Move, Owner, Piece, PieceOrientation, SquareContents, SquareStatus } from "./types";
import { faChessBishop, faChessKing, faChessKnight, faChessPawn, faChessQueen, faChessRook } from '@fortawesome/free-solid-svg-icons';

export const setUpSquare = (piece: Piece, owner: Owner, orientation: PieceOrientation): SquareContents => {
  piece.owner = owner;
  piece.orientation = orientation;
  const sc: SquareContents = {
    piece: piece,
    squareStatuses: new Set<SquareStatus>(),
  }
  return sc;
}

const emptyMoveF = () => {
  return []
}

export const EmptySquare = (): SquareContents => {
  const piece = {
    owner: null,
    moveF: emptyMoveF.bind(this),
    icon: null,
    nMoves: 0,
    orientation: null,
    pieceStatuses: [],
  };
  const sc = {
    piece: piece,
    squareStatuses: new Set<SquareStatus>(),
  }
  return sc;
}

const pawnBasicMoveF = (piece: Piece, row: number, col: number, board: (SquareContents | null)[][]): Move[] => {
  const moves: Move[] = [];
  if (piece.orientation === PieceOrientation.bottom) {
    moves.push({ row: row - 1, col: col });
    if (piece.nMoves === 0) {
      moves.push({ row: row - 2, col: col });
    }
  } else if (piece.orientation === PieceOrientation.top) {
    moves.push({ row: row + 1, col: col });
    if (piece.nMoves === 0) {
      moves.push({ row: row + 2, col: col });
    }
  }
  // Filter out-of-bounds moves
  moves.filter((move: Move) => board[move.row][move.col] != null);
  return moves;
}

export const PawnBasic = (): Piece => {
  const piece = {
    owner: null,
    moveF: pawnBasicMoveF,
    icon: faChessPawn,
    nMoves: 0,
    orientation: null,
    pieceStatuses: [],
  }
  return piece;
}

const rookBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const RookBasic = (): Piece => {
  const piece = {
    owner: null,
    moveF: rookBasicMoveF,
    icon: faChessRook,
    nMoves: 0,
    orientation: null,
    pieceStatuses: [],
  }
  return piece;
}

const bishopBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const BishopBasic = (): Piece => {
  const piece = {
    owner: null,
    moveF: bishopBasicMoveF,
    icon: faChessBishop,
    nMoves: 0,
    orientation: null,
    pieceStatuses: [],
  }
  return piece;
}

const knightBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const KnightBasic = (): Piece => {
  const piece = {
    owner: null,
    moveF: knightBasicMoveF,
    icon: faChessKnight,
    nMoves: 0,
    orientation: null,
    pieceStatuses: [],
  }
  return piece;
}

const kingBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const KingBasic = (): Piece => {
  const piece = {
    owner: null,
    moveF: kingBasicMoveF,
    icon: faChessKing,
    nMoves: 0,
    orientation: null,
    pieceStatuses: [],
  }
  return piece;
}

const queenBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const QueenBasic = (): Piece => {
  const piece = {
    owner: null,
    moveF: queenBasicMoveF,
    icon: faChessQueen,
    nMoves: 0,
    orientation: null,
    pieceStatuses: [],
  }
  return piece;
}


