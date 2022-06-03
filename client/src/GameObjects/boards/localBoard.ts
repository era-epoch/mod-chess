import { SquareContents } from '../../types';
import {
  setUpSquare,
  EmptySquare,
  RookBasic,
  KnightBasic,
  BishopBasic,
  QueenBasic,
  KingBasic,
  PawnBasic,
} from '../piecesBasic';

const localBoard: SquareContents[][] = [
  [
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
  ],
  [
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(RookBasic(), 1, 0, true),
    setUpSquare(KnightBasic(), 1, 0, true),
    setUpSquare(BishopBasic(), 1, 0, true),
    setUpSquare(QueenBasic(), 1, 0, true),
    setUpSquare(KingBasic(), 1, 0, true),
    setUpSquare(BishopBasic(), 1, 0, true),
    setUpSquare(KnightBasic(), 1, 0, true),
    setUpSquare(RookBasic(), 1, 0, true),
    setUpSquare(EmptySquare(), 2, 2, false),
  ],
  [
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(PawnBasic(), 1, 0, true),
    setUpSquare(PawnBasic(), 1, 0, true),
    setUpSquare(PawnBasic(), 1, 0, true),
    setUpSquare(PawnBasic(), 1, 0, true),
    setUpSquare(PawnBasic(), 1, 0, true),
    setUpSquare(PawnBasic(), 1, 0, true),
    setUpSquare(PawnBasic(), 1, 0, true),
    setUpSquare(PawnBasic(), 1, 0, true),
    setUpSquare(EmptySquare(), 2, 2, false),
  ],
  [
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, false),
  ],
  [
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, false),
  ],
  [
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, false),
  ],
  [
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, true),
    setUpSquare(EmptySquare(), 2, 2, false),
  ],
  [
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(PawnBasic(), 0, 1, true),
    setUpSquare(PawnBasic(), 0, 1, true),
    setUpSquare(PawnBasic(), 0, 1, true),
    setUpSquare(PawnBasic(), 0, 1, true),
    setUpSquare(PawnBasic(), 0, 1, true),
    setUpSquare(PawnBasic(), 0, 1, true),
    setUpSquare(PawnBasic(), 0, 1, true),
    setUpSquare(PawnBasic(), 0, 1, true),
    setUpSquare(EmptySquare(), 2, 2, false),
  ],
  [
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(RookBasic(), 0, 1, true),
    setUpSquare(KnightBasic(), 0, 1, true),
    setUpSquare(BishopBasic(), 0, 1, true),
    setUpSquare(QueenBasic(), 0, 1, true),
    setUpSquare(KingBasic(), 0, 1, true),
    setUpSquare(BishopBasic(), 0, 1, true),
    setUpSquare(KnightBasic(), 0, 1, true),
    setUpSquare(RookBasic(), 0, 1, true),
    setUpSquare(EmptySquare(), 2, 2, false),
  ],
  [
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
    setUpSquare(EmptySquare(), 2, 2, false),
  ],
];

export default localBoard;