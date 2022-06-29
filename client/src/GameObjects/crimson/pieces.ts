import { Piece, PlayerColour, PieceIdentifier, Orientation, PieceStatus, PieceType } from '../../types';
import { genPID } from '../gameUtil';

export const CrimsonPawn = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    // TODO: get rid of piecestatus as Set
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.pawn,
    pieceIdentifier: PieceIdentifier.crimsonPawn,
    id: genPID(),
    name: 'Thrall',
    onDeathFs: [],
    onTurnStartFs: [],
    onTurnEndFs: [],
    onMovedFs: [],
  };
  return piece;
};
