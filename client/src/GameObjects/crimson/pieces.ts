import { Piece, PlayerColour, PieceIdentifier, Orientation, PieceType, PieceOrigin } from '../../types';
import { genPID } from '../gameUtil';

export const CrimsonPawn = (): Piece => {
  const piece: Piece = {
    owner: PlayerColour.neutral,
    nMoves: 0,
    orientation: Orientation.neutral,
    statuses: [],
    type: PieceType.pawn,
    identifier: PieceIdentifier.crimsonPawn,
    origin: PieceOrigin.crimson,
    id: genPID(),
    name: 'Thrall',
  };
  return piece;
};
