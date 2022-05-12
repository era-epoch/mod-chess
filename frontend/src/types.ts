export enum Owner {
  'light' = 0,
  'dark' = 1,
}

export enum PieceOrientation {
  'top' = 0,
  'bottom' = 1,
}

export enum SquareStatus {
  HL = 'square-highlighted',
  SEL = 'square-selected',
}

export enum PieceStatus {

}

export interface Move {
  row: number,
  col: number,
}


export interface SquareContents {
  piece: Piece,
  squareStatuses: Set<SquareStatus>,
}

export interface Piece {
  owner: Owner | null,
  pieceStatuses: number[],
  moveF: Function,
  icon: any,
  nMoves: number,
  orientation: PieceOrientation | null,
}