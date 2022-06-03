import { GameState } from '../state/slices/game/slice';
import { Piece, Move, Orientation, PieceIdentifier, MoveFlag, MoveFunction, PieceType } from '../types';
import { filterMoves, validateMoveWRTKing } from './piecesBasic';

const emptyMoveF = (piece: Piece, row: number, col: number, state: GameState, checkKing: boolean = true): Move[] => {
  return [];
};

const pawnBasicMoveF = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  checkKing: boolean = true,
): Move[] => {
  const board = state.board;
  let moves: Move[] = [];
  if (piece.orientation === Orientation.bottom) {
    if (board[row - 1][col].piece.pieceType === PieceType.empty) {
      moves.push({ row: row - 1, col: col, oRow: row, oCol: col });
    }
    if (
      piece.nMoves === 0 &&
      board[row - 2][col].piece.pieceType === PieceType.empty &&
      board[row - 1][col].piece.pieceType === PieceType.empty
    ) {
      moves.push({ row: row - 2, col: col, flags: new Set<MoveFlag>([MoveFlag.EP]), oRow: row, oCol: col });
    }
    if (
      board[row - 1][col - 1].piece.owner === (piece.owner + 1) % 2 ||
      (board[row - 1][col - 1].enPassantOrigin !== null &&
        board[row - 1][col - 1].enPassantOrigin?.owner !== piece.owner)
    ) {
      moves.push({ row: row - 1, col: col - 1, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
    }
    if (
      board[row - 1][col + 1].piece.owner === (piece.owner + 1) % 2 ||
      (board[row - 1][col + 1].enPassantOrigin !== null &&
        board[row - 1][col + 1].enPassantOrigin?.owner !== piece.owner)
    ) {
      moves.push({ row: row - 1, col: col + 1, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
    }
  } else if (piece.orientation === Orientation.top) {
    if (board[row + 1][col].piece.pieceType === PieceType.empty) {
      moves.push({ row: row + 1, col: col, oRow: row, oCol: col });
    }
    if (
      piece.nMoves === 0 &&
      board[row + 2][col].piece.pieceType === PieceType.empty &&
      board[row + 1][col].piece.pieceType === PieceType.empty
    ) {
      moves.push({ row: row + 2, col: col, flags: new Set<MoveFlag>([MoveFlag.EP]), oRow: row, oCol: col });
    }
    if (
      board[row + 1][col - 1].piece.owner === (piece.owner + 1) % 2 ||
      (board[row + 1][col - 1].enPassantOrigin !== null &&
        board[row + 1][col - 1].enPassantOrigin?.owner !== piece.owner)
    ) {
      moves.push({ row: row + 1, col: col - 1, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
    }
    if (
      board[row + 1][col + 1].piece.owner === (piece.owner + 1) % 2 ||
      (board[row + 1][col + 1].enPassantOrigin !== null &&
        board[row + 1][col + 1].enPassantOrigin?.owner !== piece.owner)
    ) {
      moves.push({ row: row + 1, col: col + 1, flags: new Set<MoveFlag>([MoveFlag.KILL]), oRow: row, oCol: col });
    }
  }
  return filterMoves(piece, row, col, state, moves, checkKing);
};

const rookBasicMoveF = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  checkKing: boolean = true,
): Move[] => {
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
};

const bishopBasicMoveF = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  checkKing: boolean = true,
): Move[] => {
  const board = state.board;
  let moves: Move[] = [];
  let i = 1;
  while (
    row + i < board.length &&
    col + i < board[0].length &&
    board[row + i][col + i].piece.pieceType === PieceType.empty
  ) {
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
};

const knightBasicMoveF = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  checkKing: boolean = true,
): Move[] => {
  const board = state.board;
  let moves: Move[] = [];
  const options = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];
  for (const option of options) {
    if (
      row + option[0] >= 0 &&
      row + option[0] < board.length &&
      col + option[1] >= 0 &&
      col + option[1] < board[0].length &&
      (board[row + option[0]][col + option[1]].piece.pieceType === PieceType.empty ||
        board[row + option[0]][col + option[1]].piece.owner !== piece.owner)
    ) {
      if (board[row + option[0]][col + option[1]].piece.owner === (piece.owner + 1) % 2) {
        moves.push({
          row: row + option[0],
          col: col + option[1],
          flags: new Set<MoveFlag>([MoveFlag.KILL]),
          oRow: row,
          oCol: col,
        });
      } else {
        moves.push({ row: row + option[0], col: col + option[1], oRow: row, oCol: col });
      }
    }
  }
  return filterMoves(piece, row, col, state, moves, checkKing);
};

const queenBasicMoveF = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  checkKing: boolean = true,
): Move[] => {
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
  while (
    row + i < board.length &&
    col + i < board[0].length &&
    board[row + i][col + i].piece.pieceType === PieceType.empty
  ) {
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
};

const kingBasicMoveF = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  checkKing: boolean = true,
): Move[] => {
  const board = state.board;
  let moves: Move[] = [];
  const options = [
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [0, 1],
    [0, -1],
  ];
  for (const option of options) {
    if (
      row + option[0] >= 0 &&
      row + option[0] < board.length &&
      col + option[1] >= 0 &&
      col + option[1] < board[0].length &&
      (board[row + option[0]][col + option[1]].piece.pieceType === PieceType.empty ||
        board[row + option[0]][col + option[1]].piece.owner !== piece.owner)
    ) {
      if (board[row + option[0]][col + option[1]].piece.owner === (piece.owner + 1) % 2) {
        moves.push({
          row: row + option[0],
          col: col + option[1],
          flags: new Set<MoveFlag>([MoveFlag.KILL]),
          oRow: row,
          oCol: col,
        });
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
    if (
      !blockedRight &&
      col + i < board[0].length &&
      board[row][col + i].piece.pieceType === PieceType.rook &&
      board[row][col + i].piece.owner === piece.owner &&
      board[row][col + i].piece.nMoves === 0 &&
      (checkKing ? validateMoveWRTKing(piece, row, col, state, { row: row, col: col + 1, oRow: row, oCol: col }) : true)
    ) {
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
    if (
      !blockedLeft &&
      col - i >= 0 &&
      board[row][col - i].piece.pieceType === PieceType.rook &&
      board[row][col - i].piece.owner === piece.owner &&
      board[row][col - i].piece.nMoves === 0 &&
      (checkKing ? validateMoveWRTKing(piece, row, col, state, { row: row, col: col - 1, oRow: row, oCol: col }) : true)
    ) {
      moves.push({ row: row, col: col - 2, flags: new Set<MoveFlag>([MoveFlag.CSTL]), oRow: row, oCol: col });
    }
  }
  return filterMoves(piece, row, col, state, moves, checkKing);
};

const moveFunctionMap = new Map<PieceIdentifier, MoveFunction>([
  [PieceIdentifier.emptyBasic, emptyMoveF],
  [PieceIdentifier.pawnBasic, pawnBasicMoveF],
  [PieceIdentifier.rookBasic, rookBasicMoveF],
  [PieceIdentifier.knightBasic, knightBasicMoveF],
  [PieceIdentifier.bishopBasic, bishopBasicMoveF],
  [PieceIdentifier.queenBasic, queenBasicMoveF],
  [PieceIdentifier.kingBasic, kingBasicMoveF],
]);

export default moveFunctionMap;
