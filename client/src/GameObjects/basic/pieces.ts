import { PlayerColour, Piece, Orientation, PieceStatus, PieceType, PieceIdentifier } from '../../types';
import { genPID } from '../gameUtil';

export const EmptySquare = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    pieceIdentifier: PieceIdentifier.emptyBasic,
    nMoves: 0,
    orientation: Orientation.neutral,
    // TODO: get rid of piecestatus as Set
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
    owner: PlayerColour.neutral,
    pieceIdentifier: PieceIdentifier.pawnBasic,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.pawn,
    id: genPID(),
    name: 'Pawn',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const RookBasic = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceIdentifier: PieceIdentifier.rookBasic,
    pieceType: PieceType.rook,
    id: genPID(),
    name: 'Rook',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const BishopBasic = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.bishop,
    pieceIdentifier: PieceIdentifier.bishopBasic,
    id: genPID(),
    name: 'Bishop',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const KnightBasic = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.knight,
    pieceIdentifier: PieceIdentifier.knightBasic,
    id: genPID(),
    name: 'Knight',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const QueenBasic = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.queen,
    pieceIdentifier: PieceIdentifier.queenBasic,
    id: genPID(),
    name: 'Queen',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};

export const KingBasic = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.king,
    pieceIdentifier: PieceIdentifier.kingBasic,
    id: genPID(),
    name: 'King',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};
