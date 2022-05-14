import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setUpSquare, EmptySquare, RookBasic, KnightBasic, BishopBasic, QueenBasic, KingBasic, PawnBasic } from '../../piecesBasic';
import { Move, MoveFlag, Piece, PieceType, SquareContents, SquareStatus } from '../../types';

const initialBoard: SquareContents[][] = [
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
  setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
  setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
  setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(RookBasic(), 1, 0, true), setUpSquare(KnightBasic(), 1, 0, true),
  setUpSquare(BishopBasic(), 1, 0, true), setUpSquare(QueenBasic(), 1, 0, true), setUpSquare(KingBasic(), 1, 0, true),
  setUpSquare(BishopBasic(), 1, 0, true), setUpSquare(KnightBasic(), 1, 0, true), setUpSquare(RookBasic(), 1, 0, true),
  setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(PawnBasic(), 1, 0, true), setUpSquare(PawnBasic(), 1, 0, true),
  setUpSquare(PawnBasic(), 1, 0, true), setUpSquare(PawnBasic(), 1, 0, true), setUpSquare(PawnBasic(), 1, 0, true),
  setUpSquare(PawnBasic(), 1, 0, true), setUpSquare(PawnBasic(), 1, 0, true), setUpSquare(PawnBasic(), 1, 0, true),
  setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true), setUpSquare(EmptySquare(), 2, 2, true),
  setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(PawnBasic(), 0, 1, true), setUpSquare(PawnBasic(), 0, 1, true),
  setUpSquare(PawnBasic(), 0, 1, true), setUpSquare(PawnBasic(), 0, 1, true), setUpSquare(PawnBasic(), 0, 1, true),
  setUpSquare(PawnBasic(), 0, 1, true), setUpSquare(PawnBasic(), 0, 1, true), setUpSquare(PawnBasic(), 0, 1, true),
  setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(RookBasic(), 0, 1, true), setUpSquare(KnightBasic(), 0, 1, true),
  setUpSquare(BishopBasic(), 0, 1, true), setUpSquare(QueenBasic(), 0, 1, true), setUpSquare(KingBasic(), 0, 1, true),
  setUpSquare(BishopBasic(), 0, 1, true), setUpSquare(KnightBasic(), 0, 1, true), setUpSquare(RookBasic(), 0, 1, true),
  setUpSquare(EmptySquare(), 2, 2, false)],
  [setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
  setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
  setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false), setUpSquare(EmptySquare(), 2, 2, false),
  setUpSquare(EmptySquare(), 2, 2, false)],
]

interface GameState {
  board: SquareContents[][],
  boardClone: SquareContents[][],
  turn: number,
  selectedRow: number | null,
  selectedCol: number | null,
}

// interface GameRecord {
//   states: SquareContents[][][],
// }

const initialGameState: GameState = {
  board: initialBoard,
  boardClone: initialBoard,
  turn: 0,
  selectedRow: null,
  selectedCol: null,
}

const movePiece = (gameState: GameState, piece: Piece, move: Move) => {
  // piece.onMove();
  if (move.flags?.has(MoveFlag.CSTL)) {
    // Castle Logic
    let kingPos = 0;
    // Look for the selected king *in this row*
    for (let i = 0; i < gameState.board[move.row].length; i++) {
      if (gameState.board[move.row][i].squareStatuses.has(SquareStatus.SEL)) {
        kingPos = i;
        break;
      }
    }
    if (move.col < kingPos) {
      // Castling to the left
      let i = 1;
      while (gameState.board[move.row][move.col - i].piece.pieceType !== PieceType.rook) {
        i++;
      }
      gameState.board[move.row][move.col + 1].piece = gameState.board[move.row][move.col - i].piece;
      gameState.board[move.row][move.col - i].piece = EmptySquare();
    } else {
      // Castling to the right
      let i = 1;
      while (gameState.board[move.row][move.col + i].piece.pieceType !== PieceType.rook) {
        i++;
      }
      gameState.board[move.row][move.col - 1].piece = gameState.board[move.row][move.col + i].piece;
      gameState.board[move.row][move.col + i].piece = EmptySquare();
    }
  }
  if (move.flags?.has(MoveFlag.EP)) {
    // En passant logic
    let pawnPos = 0;
    // Look for the selected pawn *in this column*
    for (let i = 0; i < gameState.board.length; i++) {
      if (gameState.board[i][move.col].squareStatuses.has(SquareStatus.SEL)) {
        pawnPos = i;
        break;
      }
    }
    if (pawnPos < move.col) {
      // En passant square is above
      gameState.board[move.row - 1][move.col].squareStatuses.add(SquareStatus.EPV);
    } else {
      // En passant square is below
      gameState.board[move.row + 1][move.col].squareStatuses.add(SquareStatus.EPV);
    }
  }
  gameState.board[move.row][move.col].piece = piece;
}

const removePiece = (gameState: GameState, piece: Piece, move: Move) => {
  // prevState[row][col].piece.onDeath();
  gameState.board[move.row][move.col].piece = EmptySquare();
}

// Reducer
const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    makeMove: (state: GameState, action: PayloadAction<{ row: number, col: number }>) => {
      if (state.selectedRow === null || state.selectedCol === null) return;
      const pieceToMove = state.board[state.selectedRow][state.selectedCol].piece;
      const move = pieceToMove.moveF(pieceToMove, state.selectedRow, state.selectedCol, state.boardClone, true).find((move: Move) => move.row === action.payload.row
        && move.col === action.payload.col);
      if (!pieceToMove || !move) return;
      const originSquare = state.board[state.selectedRow][state.selectedCol];
      // PRE-MOVE
      let i = 0;
      for (const row of state.board) {
        let j = 0;
        for (const cell of row) {
          state.board[i][j].squareStatuses.delete(SquareStatus.EPV);
          j++;
        }
        i++;
      }
      // LEAVING
      originSquare.piece = EmptySquare();
      // REMOVING TARGET
      removePiece(state, pieceToMove, move);
      // ENTERING & EFFECTS
      movePiece(state, pieceToMove, move);
      state.board[action.payload.row][action.payload.col].piece.nMoves++;
      // CLEANUP
      i = 0;
      for (const row of state.board) {
        let j = 0;
        for (const cell of row) {
          state.board[i][j].squareStatuses.delete(SquareStatus.HL);
          state.board[i][j].squareStatuses.delete(SquareStatus.SEL);
          state.board[i][j].squareStatuses.delete(SquareStatus.HLC);
          state.board[i][j].squareStatuses.delete(SquareStatus.HLK);
          j++;
        }
        i++;
      }
      state.boardClone = state.board;
    },
    selectSquare: (state: GameState, action: PayloadAction<{ row: number, col: number }>) => {
      const row = action.payload.row;
      const col = action.payload.col;
      // const movesToHighlight: Move[] = [];
      const movesToHighlight: Move[] = state.board[row][col].piece.moveF(state.board[row][col].piece, row, col, state.boardClone, true);
      const selectedSameSquare = (state.selectedRow === row && state.selectedCol === col);
      let i = 0;
      for (const row of state.board) {
        let j = 0;
        for (const cell of row) {
          let match = false;
          let castle = false;
          let kill = false;
          let ept = false;
          for (const move of movesToHighlight) {
            if (move.row === i && move.col === j) {
              match = true;
              if (move.flags?.has(MoveFlag.CSTL)) {
                castle = true;
              }
              if (move.flags?.has(MoveFlag.KILL)) {
                kill = true;
              }
              if (move.flags?.has(MoveFlag.EPT)) {
                ept = true;
              }
              break;
            }
          }
          if (match && !selectedSameSquare) {
            if (castle) {
              state.board[i][j].squareStatuses.add(SquareStatus.HLC);
            } else if (kill) {
              state.board[i][j].squareStatuses.add(SquareStatus.HLK);
            } else if (ept) {
              state.board[i][j].squareStatuses.add(SquareStatus.HLK);
            } else {
              state.board[i][j].squareStatuses.add(SquareStatus.HL);
            }
          } else {
            state.board[i][j].squareStatuses.delete(SquareStatus.HL);
            state.board[i][j].squareStatuses.delete(SquareStatus.HLC);
            state.board[i][j].squareStatuses.delete(SquareStatus.HLK);
          }
          state.board[i][j].squareStatuses.delete(SquareStatus.SEL);
          j++;
        }
        i++;
      }
      if (!selectedSameSquare) state.board[row][col].squareStatuses.add(SquareStatus.SEL);
      if (!selectedSameSquare) {
        state.selectedRow = row;
        state.selectedCol = col;
      } else {
        state.selectedRow = null;
        state.selectedCol = null;
      }
      state.boardClone = state.board;
    },
  },
});
export default gameSlice.reducer;
export const { makeMove, selectSquare } = gameSlice.actions;