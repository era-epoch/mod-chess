import { Piece, PlayerColour, Orientation, PieceType, PieceIdentifier, PieceOrigin } from '../../types';
import { genPID } from '../gameUtil';

export const ScourgePawn = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    type: PieceType.pawn,
    identifier: PieceIdentifier.scourgePawn,
    origin: PieceOrigin.scourge,
    id: genPID(),
    name: 'Infected Rat',
  };
  return piece;
};

export const ScourgeBishop = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    type: PieceType.bishop,
    identifier: PieceIdentifier.scourgeBishop,
    origin: PieceOrigin.scourge,
    id: genPID(),
    name: 'Plague Doctor',
  };
  return piece;
};

export const ScourgeRook = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    identifier: PieceIdentifier.scourgeRook,
    type: PieceType.rook,
    origin: PieceOrigin.scourge,
    id: genPID(),
    name: 'Scourge Rook',
  };
  return piece;
};
