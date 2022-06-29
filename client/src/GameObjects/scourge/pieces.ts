import { Piece, PlayerColour, Orientation, PieceStatus, PieceType, PieceIdentifier } from '../../types';
import { genPID } from '../gameUtil';

export const ScourgePawn = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    // TODO: get rid of piecestatus as Set
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.pawn,
    pieceIdentifier: PieceIdentifier.scourgePawn,
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
    // TODO: get rid of piecestatus as Set
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.bishop,
    pieceIdentifier: PieceIdentifier.scourgeBishop,
    id: genPID(),
    name: 'Plague Doctor',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};
