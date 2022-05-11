export enum Owner {
  'light' = 0,
  'dark' = 1,
}

export interface Square {
  posX: number;
  posY: number;
  contents: SquareContents;
}

export interface SquareContents {
  owner: Owner | null,
  statusEffects: number[],
  moveF: Function,
  icon: any,
}

export interface Piece extends SquareContents { }