import { GameState } from "./state/slices/gameSlice";

export enum Owner {
  'light' = 0,
  'dark' = 1,
  'neutral' = 2,
}

export enum Orientation {
  'top' = 0,
  'bottom' = 1,
  'neutral' = 2,
}

export enum SquareStatus {
  HL = 'square-highlighted',
  HLC = 'square-highlighted-castle',
  HLK = 'square-highlighted-kill',
  SEL = 'square-selected',
  EPV = 'en-passant-vulnerable',
}

export enum PieceStatus {

}

export enum PieceType {
  'empty' = 0,
  'pawn' = 1,
  'rook' = 2,
  'knight' = 3,
  'bishop' = 4,
  'queen' = 5,
  'king' = 6,
}

export enum MoveFlag {
  CSTL = 'castle',
  KILL = 'kill',
  EP = 'en-passant',
}

export interface Move {
  row: number,
  col: number,
  oRow: number,
  oCol: number,
  flags?: Set<MoveFlag>,
}


export interface SquareContents {
  inBounds: boolean,
  piece: Piece,
  squareStatuses: Set<SquareStatus>,
  enPassantOrigin: Piece | null,
}

export interface Piece {
  name: string,
  id: number,
  owner: Owner,
  pieceStatuses: Set<PieceStatus>,
  moveF: (piece: Piece, row: number, col: number, state: GameState, checkKing: boolean) => Move[],
  icon: any,
  nMoves: number,
  orientation: Orientation,
  pieceType: PieceType,
}
