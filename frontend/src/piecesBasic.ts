import { Move, Owner, Piece, Orientation, PieceStatus, SquareContents, SquareStatus, PieceType, MoveFlag } from "./types";
import { faChessBishop, faChessKing, faChessKnight, faChessPawn, faChessQueen, faChessRook } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { GameState } from "./state/slices/gameSlice";
import cloneDeep from "lodash.clonedeep";
import produce, { Immer } from "immer";

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

const emptyMoveF = (piece: Piece, row: number, col: number, state: GameState, checkKing: boolean = true): Move[] => {
  return [];
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

export const filterMoves = (piece: Piece, row: number, col: number, state: GameState, moves: Move[], checkKing: boolean): Move[] => {
  const board = state.board;
  // Filter moves that put the king in danger & out-of-bounds moves
  moves = moves.filter((move: Move) => board[move.row][move.col].inBounds);
  if (checkKing) moves = moves.filter((move: Move) => validateMoveWRTKing(piece, row, col, state, move));
  // Add en passant targeted flag to moves that target an en passant square
  moves = moves.map((move: Move) => {
    if (board[move.row][move.col].squareStatuses.has(SquareStatus.EPV)) {
      move.flags = new Set<MoveFlag>([MoveFlag.EPT]);
    }
    return move;
  })
  return moves;
}

const pawnBasicMoveF = (piece: Piece, row: number, col: number, state: GameState, checkKing: boolean = true): Move[] => {
  const board = state.board;
  let moves: Move[] = [];
  if (piece.orientation === Orientation.bottom) {
    if (board[row - 1][col].piece.pieceType === PieceType.empty) {
      moves.push({ row: row - 1, col: col, oRow: row, oCol: col });
    }
    if (piece.nMoves === 0
      && board[row - 2][col].piece.pieceType === PieceType.empty
      && board[row - 1][col].piece.pieceType === PieceType.empty) {
      moves.push({ row: row - 2, col: col, flags: new Set<MoveFlag>([MoveFlag.EP]), oRow: row, oCol: col });
    }
    if (board[row - 1][col - 1].piece.owner === (piece.owner + 1) % 2) {
      moves.push({ row: row - 1, col: col - 1, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
    }
    if (board[row - 1][col + 1].piece.owner === (piece.owner + 1) % 2) {
      moves.push({ row: row - 1, col: col + 1, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
    }
  } else if (piece.orientation === Orientation.top) {
    if (board[row + 1][col].piece.pieceType === PieceType.empty) {
      moves.push({ row: row + 1, col: col, oRow: row, oCol: col });
    }
    if (piece.nMoves === 0
      && board[row + 2][col].piece.pieceType === PieceType.empty
      && board[row + 1][col].piece.pieceType === PieceType.empty) {
      moves.push({ row: row + 2, col: col, flags: new Set<MoveFlag>([MoveFlag.EP]), oRow: row, oCol: col });
    }
    if (board[row + 1][col - 1].piece.owner === (piece.owner + 1) % 2) {
      moves.push({ row: row + 1, col: col - 1, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
    }
    if (board[row + 1][col + 1].piece.owner === (piece.owner + 1) % 2) {
      moves.push({ row: row + 1, col: col + 1, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
    }
  }
  return filterMoves(piece, row, col, state, moves, checkKing);
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

const rookBasicMoveF = (piece: Piece, row: number, col: number, state: GameState, checkKing: boolean = true): Move[] => {
  const board = state.board;
  let moves: Move[] = [];
  let i = 1;
  while (row + i < board.length && board[row + i][col].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col, oRow: row, oCol: col });
    i++;
  }
  if (row + i < board.length && board[row + i][col].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (row - i >= 0 && board[row - i][col].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col, oRow: row, oCol: col });
    i++;
  }
  if (row - i >= 0 && board[row - i][col].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (col + i < board[0].length && board[row][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row, col: col + i, oRow: row, oCol: col });
    i++;
  }
  if (col + i < board[0].length && board[row][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row, col: col + i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (col - i >= 0 && board[row][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row, col: col - i, oRow: row, oCol: col });
    i++;
  }
  if (col - i >= 0 && board[row][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row, col: col - i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  return filterMoves(piece, row, col, state, moves, checkKing);
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

const bishopBasicMoveF = (piece: Piece, row: number, col: number, state: GameState, checkKing: boolean = true): Move[] => {
  const board = state.board;
  let moves: Move[] = [];
  let i = 1;
  while (row + i < board.length && col + i < board[0].length && board[row + i][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col + i, oRow: row, oCol: col });
    i++;
  }
  if (row + i < board.length && col + i < board[0].length && board[row + i][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col + i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (row + i < board.length && col - i >= 0 && board[row + i][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col - i, oRow: row, oCol: col });
    i++;
  }
  if (row + i < board.length && col - i >= 0 && board[row + i][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col - i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (row - i >= 0 && col - i >= 0 && board[row - i][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col - i, oRow: row, oCol: col });
    i++;
  }
  if (row - i >= 0 && col - i >= 0 && board[row - i][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col - i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (row - i >= 0 && col + i < board[0].length && board[row - i][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col + i, oRow: row, oCol: col });
    i++;
  }
  if (row - i >= 0 && col + i < board[0].length && board[row - i][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col + i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  return filterMoves(piece, row, col, state, moves, checkKing);
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

const knightBasicMoveF = (piece: Piece, row: number, col: number, state: GameState, checkKing: boolean = true): Move[] => {
  const board = state.board;
  let moves: Move[] = [];
  const options = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
  for (const option of options) {
    if (row + option[0] >= 0 && row + option[0] < board.length
      && col + option[1] >= 0 && col + option[1] < board[0].length
      && (board[row + option[0]][col + option[1]].piece.pieceType === PieceType.empty
        || board[row + option[0]][col + option[1]].piece.owner !== piece.owner)) {
      if (board[row + option[0]][col + option[1]].piece.owner === (piece.owner + 1) % 2) {
        moves.push({ row: row + option[0], col: col + option[1], flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
      } else {
        moves.push({ row: row + option[0], col: col + option[1], oRow: row, oCol: col });
      }
    }
  }
  return filterMoves(piece, row, col, state, moves, checkKing);
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

const queenBasicMoveF = (piece: Piece, row: number, col: number, state: GameState, checkKing: boolean = true): Move[] => {
  const board = state.board;
  let moves: Move[] = [];
  let i = 1;
  while (row + i < board.length && board[row + i][col].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col, oRow: row, oCol: col });
    i++;
  }
  if (row + i < board.length && board[row + i][col].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (row - i >= 0 && board[row - i][col].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col, oRow: row, oCol: col });
    i++;
  }
  if (row - i >= 0 && board[row - i][col].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (col + i < board[0].length && board[row][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row, col: col + i, oRow: row, oCol: col });
    i++;
  }
  if (col + i < board[0].length && board[row][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row, col: col + i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (col - i >= 0 && board[row][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row, col: col - i, oRow: row, oCol: col });
    i++;
  }
  if (col - i >= 0 && board[row][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row, col: col - i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (row + i < board.length && col + i < board[0].length && board[row + i][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col + i, oRow: row, oCol: col });
    i++;
  }
  if (row + i < board.length && col + i < board[0].length && board[row + i][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col + i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (row + i < board.length && col - i >= 0 && board[row + i][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row + i, col: col - i, oRow: row, oCol: col });
    i++;
  }
  if (row + i < board.length && col - i >= 0 && board[row + i][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row + i, col: col - i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (row - i >= 0 && col - i >= 0 && board[row - i][col - i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col - i, oRow: row, oCol: col });
    i++;
  }
  if (row - i >= 0 && col - i >= 0 && board[row - i][col - i].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col - i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  i = 1;
  while (row - i >= 0 && col + i < board[0].length && board[row - i][col + i].piece.pieceType === PieceType.empty) {
    moves.push({ row: row - i, col: col + i, oRow: row, oCol: col });
    i++;
  }
  if (row - i >= 0 && col + i < board[0].length && board[row - i][col + i].piece.owner !== piece.owner) {
    moves.push({ row: row - i, col: col + i, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
  }
  return filterMoves(piece, row, col, state, moves, checkKing);
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

const kingBasicMoveF = (piece: Piece, row: number, col: number, state: GameState, checkKing: boolean = true): Move[] => {
  const board = state.board;
  let moves: Move[] = [];
  const options = [[1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1], [0, 1], [0, -1]];
  for (const option of options) {
    if (row + option[0] >= 0 && row + option[0] < board.length
      && col + option[1] >= 0 && col + option[1] < board[0].length
      && (board[row + option[0]][col + option[1]].piece.pieceType === PieceType.empty
        || board[row + option[0]][col + option[1]].piece.owner !== piece.owner)) {
      if (board[row + option[0]][col + option[1]].piece.owner === (piece.owner + 1) % 2) {
        moves.push({ row: row + option[0], col: col + option[1], flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
      } else {
        moves.push({ row: row + option[0], col: col + option[1], oRow: row, oCol: col });
      }
    }
  }
  if (piece.nMoves === 0) {
    let blockedRight = false;
    let i = 1;
    while (col + i < board[0].length && board[row][col + i].piece.pieceType !== PieceType.rook) {
      if (board[row][col + i].piece.pieceType !== PieceType.empty) {
        blockedRight = true;
      }
      i++;
    }
    if (!blockedRight
      && col + i < board[0].length
      && board[row][col + i].piece.pieceType === PieceType.rook
      && board[row][col + i].piece.owner === piece.owner
      && board[row][col + i].piece.nMoves === 0
      && (checkKing ? validateMoveWRTKing(piece, row, col, state, { row: row, col: col + 1, oRow: row, oCol: col }) : true)) {
      moves.push({ row: row, col: col + 2, flags: new Set<MoveFlag>([MoveFlag.CSTL]), oRow: row, oCol: col });
    }
    let blockedLeft = false;
    i = 1;
    while (col - i >= 0 && board[row][col - i].piece.pieceType !== PieceType.rook) {
      if (board[row][col - i].piece.pieceType !== PieceType.empty) {
        blockedLeft = true;
      }
      i++;
    }
    if (!blockedLeft
      && col - i >= 0
      && board[row][col - i].piece.pieceType === PieceType.rook
      && board[row][col - i].piece.owner === piece.owner
      && board[row][col - i].piece.nMoves === 0
      && (checkKing ? validateMoveWRTKing(piece, row, col, state, { row: row, col: col - 1, oRow: row, oCol: col }) : true)) {
      moves.push({ row: row, col: col - 2, flags: new Set<MoveFlag>([MoveFlag.CSTL]), oRow: row, oCol: col });
    }
  }
  return filterMoves(piece, row, col, state, moves, checkKing);
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

export const validateMoveWRTKing = (piece: Piece, row: number, col: number, state: GameState, move: Move): boolean => {
  let validation = true;
  const nextState = produce(state.board, (draftState: SquareContents[][]) => {
    const board = draftState;
    // board[move.row][move.col].piece.onDeath();
    board[move.row][move.col].piece = EmptySquare();
    board[row][col].piece.nMoves++;
    // board[row][col].piece.onMove();
    board[move.row][move.col].piece = board[row][col].piece;
    board[row][col].piece = EmptySquare();
    const kingPositions: Move[] = []
    const threatenedPositions: Move[] = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j].piece.owner === piece.owner && board[i][j].piece.pieceType === PieceType.king) {
          kingPositions.push({ row: i, col: j, oRow: row, oCol: col });
        }
        if (board[i][j].piece.owner !== piece.owner) {
          threatenedPositions.push(...board[i][j].piece.moveF(board[i][j].piece, i, j, state, false))
        }
      }
    }
    for (const pos of threatenedPositions) {
      for (const kpos of kingPositions) {
        if (pos.col === kpos.col && pos.row === kpos.row) {
          validation = false;
        }
      }
    }
  })
  return validation;
}
