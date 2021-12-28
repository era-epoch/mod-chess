export interface Square {
  posX: number;
  posY: number;
  contents: SquareContents;
}

export interface SquareContents { }

export interface Piece extends SquareContents { }