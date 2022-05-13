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
  HLC = 'square-highlighed-castle',
  SEL = 'square-selected',
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
  'castle',
}

export interface Move {
  row: number,
  col: number,
  flags?: Set<MoveFlag>,
}


export interface SquareContents {
  inBounds: boolean,
  piece: Piece,
  squareStatuses: Set<SquareStatus>,
}

export interface Piece {
  owner: Owner,
  pieceStatuses: Set<PieceStatus>,
  moveF: (piece: Piece, row: number, col: number, board: SquareContents[][], checkKing: boolean) => Move[],
  icon: any,
  nMoves: number,
  orientation: Orientation,
  pieceType: PieceType,
}