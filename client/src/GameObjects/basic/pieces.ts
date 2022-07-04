import { PlayerColour, Piece, Orientation, PieceType, PieceIdentifier, PieceOrigin } from '../../types';
import { genPID } from '../gameUtil';

export const EmptySquare = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    identifier: PieceIdentifier.empty,
    origin: PieceOrigin.basic,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    type: PieceType.empty,
    id: genPID(),
    name: '',
  };
  return piece;
};

export const BasicPawn = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    identifier: PieceIdentifier.basicPawn,
    origin: PieceOrigin.basic,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    type: PieceType.pawn,
    id: genPID(),
    name: 'Pawn',
  };
  return piece;
};

export const BasicRook = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    identifier: PieceIdentifier.basicRook,
    type: PieceType.rook,
    origin: PieceOrigin.basic,
    id: genPID(),
    name: 'Rook',
  };
  return piece;
};

export const BasicBishop = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    type: PieceType.bishop,
    identifier: PieceIdentifier.basicBishop,
    origin: PieceOrigin.basic,
    id: genPID(),
    name: 'Bishop',
  };
  return piece;
};

export const BasicKnight = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    type: PieceType.knight,
    identifier: PieceIdentifier.basicKnight,
    origin: PieceOrigin.basic,
    id: genPID(),
    name: 'Knight',
  };
  return piece;
};

export const BasicQueen = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    type: PieceType.queen,
    identifier: PieceIdentifier.basicQueen,
    origin: PieceOrigin.basic,
    id: genPID(),
    name: 'Queen',
  };
  return piece;
};

export const BasicKing = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    type: PieceType.king,
    identifier: PieceIdentifier.basicKing,
    origin: PieceOrigin.basic,
    id: genPID(),
    name: 'King',
  };
  return piece;
};
