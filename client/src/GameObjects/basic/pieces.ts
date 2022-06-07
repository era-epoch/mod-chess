import { Player, Piece, Orientation, PieceStatus, SquareContents, PieceType, PieceIdentifier } from '../../types';
import { genPID } from '../gameUtil';

export const setUpSquare = (
  row: number,
  col: number,
  piece: Piece,
  owner: Player,
  orientation: Orientation,
  inBounds: boolean,
): SquareContents => {
  piece.owner = owner;
  piece.orientation = orientation;
  const sc: SquareContents = {
    inBounds: inBounds,
    piece: piece,
    squareStatuses: [],
    enPassantOrigin: null,
    row: row,
    col: col,
  };
  return sc;
};

export const EmptySquare = (): Piece => {
  const piece: Piece = {
    owner: Player.neutral,
    pieceIdentifier: PieceIdentifier.emptyBasic,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.empty,
    id: genPID(),
    name: '',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const PawnBasic = (): Piece => {
  const piece: Piece = {
    owner: Player.neutral,
    pieceIdentifier: PieceIdentifier.pawnBasic,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.pawn,
    id: genPID(),
    name: '',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const RookBasic = (): Piece => {
  const piece: Piece = {
    owner: Player.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceIdentifier: PieceIdentifier.rookBasic,
    pieceType: PieceType.rook,
    id: genPID(),
    name: '',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const BishopBasic = (): Piece => {
  const piece: Piece = {
    owner: Player.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.bishop,
    pieceIdentifier: PieceIdentifier.bishopBasic,
    id: genPID(),
    name: '',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const KnightBasic = (): Piece => {
  const piece: Piece = {
    owner: Player.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.knight,
    pieceIdentifier: PieceIdentifier.knightBasic,
    id: genPID(),
    name: '',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const QueenBasic = (): Piece => {
  const piece: Piece = {
    owner: Player.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.queen,
    pieceIdentifier: PieceIdentifier.queenBasic,
    id: genPID(),
    name: '',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const KingBasic = (): Piece => {
  const piece: Piece = {
    owner: Player.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.king,
    pieceIdentifier: PieceIdentifier.kingBasic,
    id: genPID(),
    name: '',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};
