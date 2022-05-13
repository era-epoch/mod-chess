import { Move, Owner, Piece, Orientation, PieceStatus, SquareContents, SquareStatus, PieceType } from "./types";
import { faChessBishop, faChessKing, faChessKnight, faChessPawn, faChessQueen, faChessRook } from '@fortawesome/free-solid-svg-icons';
import cloneDeep from "lodash.clonedeep";

export const setUpSquare = (piece: Piece, owner: Owner, orientation: Orientation, inBounds: boolean): SquareContents => {
  piece.owner = owner;
  piece.orientation = orientation;
  const sc: SquareContents = {
    inBounds: inBounds,
    piece: piece,
    squareStatuses: new Set<SquareStatus>(),
  }
  return sc;
}

const emptyMoveF = () => {
  return []
}

export const EmptySquare = (): Piece => {
  const piece = {
    owner: Owner.neutral,
    moveF: emptyMoveF,
    icon: null,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.empty,
  };
  return piece;
}

const pawnBasicMoveF = (piece: Piece, row: number, col: number, board: (SquareContents)[][], checkKing: boolean = true): Move[] => {
  // TODO: Finish move logic (capture)
  let moves: Move[] = [];
  if (piece.orientation === Orientation.bottom) {
    moves.push({ row: row - 1, col: col });
    if (piece.nMoves === 0) {
      moves.push({ row: row - 2, col: col });
    }
  } else if (piece.orientation === Orientation.top) {
    moves.push({ row: row + 1, col: col });
    if (piece.nMoves === 0) {
      moves.push({ row: row + 2, col: col });
    }
  }
  // Filter moves that put the king in danger & out-of-bounds moves
  moves = moves.filter((move: Move) => board[move.row][move.col].inBounds);
  if (checkKing) moves = moves.filter((move: Move) => validateMoveWRTKing(piece, row, col, board, move));
  return moves;
}

export const PawnBasic = (): Piece => {
  const piece = {
    owner: Owner.neutral,
    moveF: pawnBasicMoveF,
    icon: faChessPawn,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.pawn,
  }
  return piece;
}

const rookBasicMoveF = (piece: Piece, row: number, col: number, board: SquareContents[][], checkKing: boolean = true): Move[] => {
  let moves: Move[] = [];
  let i = 1;
  while (row + i < board.length && board[row + i][col].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col });
    i++;
  }
  if (row + i < board.length && board[row + i][col].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col });
  }
  i = 1;
  while (row - i >= 0 && board[row - i][col].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col });
    i++;
  }
  if (row - i >= 0 && board[row - i][col].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col });
  }
  i = 1;
  while (col + i < board[0].length && board[row][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row, col: col + i });
    i++;
  }
  if (col + i < board[0].length && board[row][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row, col: col + i });
  }
  i = 1;
  while (col - i >= 0 && board[row][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row, col: col - i });
    i++;
  }
  if (col - i >= 0 && board[row][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row, col: col - i });
  }
  // Filter moves that put the king in danger & out-of-bounds moves
  moves = moves.filter((move: Move) => board[move.row][move.col].inBounds);
  if (checkKing) moves = moves.filter((move: Move) => validateMoveWRTKing(piece, row, col, board, move));
  return moves;
}

export const RookBasic = (): Piece => {
  const piece = {
    owner: Owner.neutral,
    moveF: rookBasicMoveF,
    icon: faChessRook,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.rook
  }
  return piece;
}

const bishopBasicMoveF = (piece: Piece, row: number, col: number, board: SquareContents[][], checkKing: boolean = true): Move[] => {
  let moves: Move[] = [];
  let i = 1;
  while (row + i < board.length && col + i < board[0].length && board[row + i][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col + i });
    i++;
  }
  if (row + i < board.length && col + i < board[0].length && board[row + i][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col + i });
  }
  i = 1;
  while (row + i < board.length && col - i >= 0 && board[row + i][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col - i });
    i++;
  }
  if (row + i < board.length && col - i >= 0 && board[row + i][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col - i });
  }
  i = 1;
  while (row - i >= 0 && col - i >= 0 && board[row - i][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col - i });
    i++;
  }
  if (row - i >= 0 && col - i >= 0 && board[row - i][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col - i });
  }
  i = 1;
  while (row - i >= 0 && col + i < board[0].length && board[row - i][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col + i });
    i++;
  }
  if (row - i >= 0 && col + i < board[0].length && board[row - i][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col + i });
  }
  // Filter moves that put the king in danger & out-of-bounds moves
  moves = moves.filter((move: Move) => board[move.row][move.col].inBounds);
  if (checkKing) moves = moves.filter((move: Move) => validateMoveWRTKing(piece, row, col, board, move));
  return moves;
}

export const BishopBasic = (): Piece => {
  const piece = {
    owner: Owner.neutral,
    moveF: bishopBasicMoveF,
    icon: faChessBishop,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.bishop,
  }
  return piece;
}

const knightBasicMoveF = (piece: Piece, row: number, col: number, board: SquareContents[][], checkKing: boolean = true): Move[] => {
  let moves: Move[] = [];
  const options = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
  for (const option of options) {
    if (row + option[0] >= 0 && row + option[0] < board.length
      && col + option[1] >= 0 && col + option[1] < board[0].length
      && (board[row + option[0]][col + option[1]].piece.pieceType === PieceType.empty
        || board[row + option[0]][col + option[1]].piece.owner !== piece.owner)) {
      moves.push({ row: row + option[0], col: col + option[1] });
    }
  }
  // Filter moves that put the king in danger & out-of-bounds moves
  moves = moves.filter((move: Move) => board[move.row][move.col].inBounds);
  if (checkKing) moves = moves.filter((move: Move) => validateMoveWRTKing(piece, row, col, board, move));
  return moves;
}

export const KnightBasic = (): Piece => {
  const piece = {
    owner: Owner.neutral,
    moveF: knightBasicMoveF,
    icon: faChessKnight,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.knight,
  }
  return piece;
}

const queenBasicMoveF = (piece: Piece, row: number, col: number, board: SquareContents[][], checkKing: boolean = true): Move[] => {
  let moves: Move[] = [];
  let i = 1;
  while (row + i < board.length && board[row + i][col].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col });
    i++;
  }
  if (row + i < board.length && board[row + i][col].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col });
  }
  i = 1;
  while (row - i >= 0 && board[row - i][col].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col });
    i++;
  }
  if (row - i >= 0 && board[row - i][col].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col });
  }
  i = 1;
  while (col + i < board[0].length && board[row][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row, col: col + i });
    i++;
  }
  if (col + i < board[0].length && board[row][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row, col: col + i });
  }
  i = 1;
  while (col - i >= 0 && board[row][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row, col: col - i });
    i++;
  }
  if (col - i >= 0 && board[row][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row, col: col - i });
  }
  i = 1;
  while (row + i < board.length && col + i < board[0].length && board[row + i][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col + i });
    i++;
  }
  if (row + i < board.length && col + i < board[0].length && board[row + i][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col + i });
  }
  i = 1;
  while (row + i < board.length && col - i >= 0 && board[row + i][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col - i });
    i++;
  }
  if (row + i < board.length && col - i >= 0 && board[row + i][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col - i });
  }
  i = 1;
  while (row - i >= 0 && col - i >= 0 && board[row - i][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col - i });
    i++;
  }
  if (row - i >= 0 && col - i >= 0 && board[row - i][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col - i });
  }
  i = 1;
  while (row - i >= 0 && col + i < board[0].length && board[row - i][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col + i });
    i++;
  }
  if (row - i >= 0 && col + i < board[0].length && board[row - i][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col + i });
  }
  // Filter moves that put the king in danger & out-of-bounds moves
  moves = moves.filter((move: Move) => board[move.row][move.col].inBounds);
  if (checkKing) moves = moves.filter((move: Move) => validateMoveWRTKing(piece, row, col, board, move));
  return moves;
}

export const QueenBasic = (): Piece => {
  const piece = {
    owner: Owner.neutral,
    moveF: queenBasicMoveF,
    icon: faChessQueen,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.queen,
  }
  return piece;
}

const kingBasicMoveF = (piece: Piece, row: number, col: number, board: SquareContents[][], checkKing: boolean = true): Move[] => {
  let moves: Move[] = [];
  const options = [[1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1], [0, 1], [0, -1]];
  for (const option of options) {
    if (row + option[0] >= 0 && row + option[0] < board.length
      && col + option[1] >= 0 && col + option[1] < board[0].length
      && (board[row + option[0]][col + option[1]].piece.pieceType === PieceType.empty
        || board[row + option[0]][col + option[1]].piece.owner !== piece.owner)) {
      moves.push({ row: row + option[0], col: col + option[1] });
    }
  }
  // TODO: Castling

  // Filter moves that put the king in danger & out-of-bounds moves
  moves = moves.filter((move: Move) => board[move.row][move.col].inBounds);
  if (checkKing) moves = moves.filter((move: Move) => validateMoveWRTKing(piece, row, col, board, move));
  return moves;
}

export const validateMoveWRTKing = (piece: Piece, row: number, col: number, board: SquareContents[][], move: Move): boolean => {
  const Board = cloneDeep(board);
  // Board[move.row][move.col].piece.onDeath();
  Board[move.row][move.col].piece = EmptySquare();
  Board[row][col].piece.nMoves++;
  // Board[row][col].piece.onMove();
  Board[move.row][move.col].piece = Board[row][col].piece;
  Board[row][col].piece = EmptySquare();
  const kingPositions: Move[] = []
  const threatenedPositions: Move[] = [];
  for (let i = 0; i < Board.length; i++) {
    for (let j = 0; j < Board[0].length; j++) {
      if (Board[i][j].piece.pieceType === PieceType.king) {
        kingPositions.push({ row: i, col: j });
      }
      if (Board[i][j].piece.owner !== piece.owner) {
        threatenedPositions.push(...Board[i][j].piece.moveF(Board[i][j].piece, i, j, Board, false))
      }
    }
  }
  for (const pos of threatenedPositions) {
    for (const kpos of kingPositions) {
      if (pos.col === kpos.col && pos.row === kpos.row) {
        return false;
      }
    }
  }
  return true;
}

export const KingBasic = (): Piece => {
  const piece = {
    owner: Owner.neutral,
    moveF: kingBasicMoveF,
    icon: faChessKing,
    nMoves: 0,
    orientation: Orientation.neutral,
    pieceStatuses: new Set<PieceStatus>(),
    pieceType: PieceType.king,
  }
  return piece;
}
