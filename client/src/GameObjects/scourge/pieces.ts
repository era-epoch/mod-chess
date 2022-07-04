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
    name: 'Plague Rat',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
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
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};
