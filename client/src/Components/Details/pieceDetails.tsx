import { PieceIdentifier } from '../../types';
import './details.css';

// SOURCES: Wikipedia

const pawn = (): JSX.Element => {
  return (
    <div className="detail">
      <div>
        <span className="detail-title">Pawn: </span>
        <span className="detail-info">
          A pawn can move forward to the unoccupied square immediately in front of it on the same file, or on its first
          move it can advance two squares along the same file, provided both squares are unoccupied. A pawn can capture
          an opponent's piece on a square diagonally in front of it by moving to that square.
        </span>
      </div>
    </div>
  );
};

const enPassant = (): JSX.Element => {
  return (
    <div className="detail">
      <div>
        <span className="detail-title">En Passant</span>
        <span className="detail-info">
          When a pawn makes a two-step advance from its starting position and there is an opponent's pawn on a square
          next to the destination square on an adjacent file, then the opponent's pawn can capture it en passant ("in
          passing"), moving to the square the pawn passed over. This can be done only on the turn immediately following
          the enemy pawn's two-square advance
        </span>
      </div>
    </div>
  );
};

const promotion = (): JSX.Element => {
  return (
    <div className="detail">
      <div>
        <span className="detail-title">Promotion: </span>
        <span className="detail-info">
          When a pawn advances to its eighth rank, as part of the move, it is promoted and must be exchanged for the
          player's choice of queen, rook, bishop, or knight of the same color.
        </span>
      </div>
    </div>
  );
};

const knight = (): JSX.Element => {
  return (
    <div className="detail">
      <div>
        <span className="detail-title">Knight: </span>
        <span className="detail-info">
          A knight moves to any of the closest squares that are not on the same rank, file, or diagonal. (Thus the move
          forms an "L"-shape: two squares vertically and one square horizontally, or two squares horizontally and one
          square vertically.)
        </span>
      </div>
    </div>
  );
};

const bishop = (): JSX.Element => {
  return (
    <div className="detail">
      <div>
        <span className="detail-title">Bishop: </span>
        <span className="detail-info">
          A bishop can move any number of squares diagonally, but cannot leap over other pieces.
        </span>
      </div>
    </div>
  );
};

const rook = (): JSX.Element => {
  return (
    <div className="detail">
      <div>
        <span className="detail-title">Rook: </span>
        <span className="detail-info">
          A rook can move any number of squares along a rank or file, but cannot leap over other pieces.
        </span>
      </div>
    </div>
  );
};

const queen = (): JSX.Element => {
  return (
    <div className="detail">
      <div>
        <span className="detail-title">Queen: </span>
        <span className="detail-info">
          A queen combines the power of a rook and bishop and can move any number of squares along a rank, file, or
          diagonal, but cannot leap over other pieces.
        </span>
      </div>
    </div>
  );
};

const king = (): JSX.Element => {
  return (
    <div className="detail">
      <div>
        <span className="detail-title">King: </span>
        <span className="detail-info">
          The king moves one square in any direction. The king is the most valuable piece — attacks on the king must be
          immediately countered, and if this is impossible, immediate loss of the game ensues.
        </span>
      </div>
    </div>
  );
};

const castling = (): JSX.Element => {
  return (
    <div className="detail">
      <div>
        <span className="detail-title">Castling: </span>
        <span className="detail-info">
          Once per game, each king can make a move known as castling. Castling consists of moving the king two squares
          toward a rook of the same color on the same rank, and then placing the rook on the square that the king
          crossed. Castling is permissible if the following conditions are met:
        </span>
      </div>
      <div className="detail-list">
        <div>1. Neither the king nor the rook has previously moved during the game.</div>
        <div>2. There are no pieces between the king and the rook.</div>
        <div>
          3. The king is not in check and does not pass through or land on any square attacked by an enemy piece.
        </div>
      </div>
      <span>Castling is still permitted if the rook is under attack, or if the rook crosses an attacked square.</span>
    </div>
  );
};

const scourgePawn = (): JSX.Element => {
  return (
    <div className="detail">
      <div>
        <span className="detail-title">Posthumous Transmission: </span>
        <span className="detail-info">
          When this piece is captured, the capturing piece gains one stack of <i>poisoned</i>.
        </span>
      </div>
    </div>
  );
};

export const pieceInfoMap = new Map<PieceIdentifier, Function[]>([
  [PieceIdentifier.basicPawn, [pawn, enPassant, promotion]],
  [PieceIdentifier.basicBishop, [bishop]],
  [PieceIdentifier.basicKnight, [knight]],
  [PieceIdentifier.basicRook, [rook]],
  [PieceIdentifier.basicQueen, [queen]],
  [PieceIdentifier.basicKing, [king, castling]],
  [PieceIdentifier.scourgePawn, [scourgePawn, pawn, enPassant, promotion]],
]);
