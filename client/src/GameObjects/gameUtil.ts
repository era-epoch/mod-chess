import produce from 'immer';
import { GameState } from '../state/slices/game/slice';
import { Piece, Move, SquareStatus, MoveFlag, Player, PieceType } from '../types';
import { EmptySquare } from './basic/pieces';
import moveFunctionMap from './pieceMoveFunctionMap';

// TODO: ensure PID sync between users
let PID = 0;
export const genPID = (): number => {
  PID++;
  return PID;
};

export const filterMoves = (
  piece: Piece,
  row: number,
  col: number,
  state: GameState,
  moves: Move[],
  checkKing: boolean,
): Move[] => {
  const board = state.board;
  // Filter moves that put the king in danger & out-of-bounds moves
  moves = moves.filter((move: Move) => board[move.row][move.col].inBounds);
  if (checkKing) moves = moves.filter((move: Move) => validateMoveWRTKing(piece, row, col, state, move));
  // Add en passant targeted flag to moves that target an en passant square
  moves = moves.map((move: Move) => {
    if (
      board[move.row][move.col].squareStatuses.includes(SquareStatus.EPV) &&
      board[move.row][move.col].enPassantOrigin?.owner !== piece.owner
    ) {
      move.flags = new Set<MoveFlag>([MoveFlag.KILL]);
    }
    return move;
  });
  return moves;
};

export const kingInCheck = (gameState: GameState, player: Player): boolean => {
  const board = gameState.board;
  const kingPositions: Move[] = [];
  const threatenedPositions: Move[] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j].piece.owner === player && board[i][j].piece.pieceType === PieceType.king) {
        kingPositions.push({ row: i, col: j });
      }
      if (board[i][j].piece.owner !== player) {
        // threatenedPositions.push(...board[i][j].piece.moveF(board[i][j].piece, i, j, gameState, false));
        const moveFunction = moveFunctionMap.get(board[i][j].piece.pieceIdentifier);
        if (moveFunction) threatenedPositions.push(...moveFunction(board[i][j].piece, i, j, gameState, false));
      }
    }
  }
  for (const pos of threatenedPositions) {
    for (const kpos of kingPositions) {
      if (pos.col === kpos.col && pos.row === kpos.row) {
        return true;
      }
    }
  }
  return false;
};

export const validateMoveWRTKing = (piece: Piece, row: number, col: number, state: GameState, move: Move): boolean => {
  let validation = true;
  const nextState = produce(state, (draftState: GameState) => {
    const board = draftState.board;
    // board[move.row][move.col].piece.onDeath();
    board[move.row][move.col].piece = EmptySquare();
    board[row][col].piece.nMoves++;
    // board[row][col].piece.onMove();
    board[move.row][move.col].piece = board[row][col].piece;
    board[row][col].piece = EmptySquare();
    validation = !kingInCheck(draftState, piece.owner);
  });
  return validation;
};
