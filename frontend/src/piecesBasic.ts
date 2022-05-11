import { Owner, SquareContents } from "./types";
import { faChessBishop, faChessKing, faChessKnight, faChessPawn, faChessQueen, faChessRook } from '@fortawesome/free-solid-svg-icons';

export const constructPiece = (piece: SquareContents, owner: Owner): SquareContents => {
  piece.owner = owner;
  return piece;
}

const emptyMoveF = () => {
  return []
}

export const EmptySquare = (): SquareContents => {
  const piece = {
    owner: null,
    statusEffects: [],
    moveF: emptyMoveF.bind(this),
    icon: null,
  };
  return piece;
}

const pawnBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const PawnBasic = (): SquareContents => {
  const piece = {
    owner: null,
    statusEffects: [],
    moveF: pawnBasicMoveF.bind(this),
    icon: faChessPawn,
  }
  return piece;
}

const rookBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const RookBasic = (): SquareContents => {
  const piece = {
    owner: null,
    statusEffects: [],
    moveF: rookBasicMoveF.bind(this),
    icon: faChessRook,
  }
  return piece;
}

const bishopBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const BishopBasic = (): SquareContents => {
  const piece = {
    owner: null,
    statusEffects: [],
    moveF: bishopBasicMoveF.bind(this),
    icon: faChessBishop,
  }
  return piece;
}

const knightBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const KnightBasic = (): SquareContents => {
  const piece = {
    owner: null,
    statusEffects: [],
    moveF: knightBasicMoveF.bind(this),
    icon: faChessKnight,
  }
  return piece;
}

const kingBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const KingBasic = (): SquareContents => {
  const piece = {
    owner: null,
    statusEffects: [],
    moveF: kingBasicMoveF.bind(this),
    icon: faChessKing,
  }
  return piece;
}

const queenBasicMoveF = (row: number, col: number, board: SquareContents[][]): [number, number][] => {
  const moves: [number, number][] = [];
  // if ()
  return moves;
}

export const QueenBasic = (): SquareContents => {
  const piece = {
    owner: null,
    statusEffects: [],
    moveF: queenBasicMoveF.bind(this),
    icon: faChessQueen,
  }
  return piece;
}


