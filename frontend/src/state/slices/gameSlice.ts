import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setUpSquare, EmptySquare, RookBasic, KnightBasic, BishopBasic, QueenBasic, KingBasic, PawnBasic } from '../../GameObjects/piecesBasic';
import { Graveyard, Move, MoveFlag, Piece, PieceType, Player, SquareContents, SquareStatus } from '../../types';

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

export interface GameState {
  board: SquareContents[][],
  turn: number,
  selectedRow: number | null,
  selectedCol: number | null,
  graveyards: Graveyard[],
}

// interface GameRecord {
//   states: SquareContents[][][],
// }

const initialGameState: GameState = {
  board: initialBoard,
  turn: 0,
  selectedRow: null,
  selectedCol: null,
  graveyards: [{ player: Player.light, contents: [] }, { player: Player.dark, contents: [] }]
}

// const onTurnTaken();

const movePiece = (gameState: GameState, piece: Piece, move: Move) => {
  // piece.onMove();
  // Castle Logic
  if (move.flags?.has(MoveFlag.CSTL)) {
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
  // En passant capture logic
  if (gameState.board[move.row][move.col].squareStatuses.has(SquareStatus.EPV)
    && gameState.board[move.row][move.col].enPassantOrigin?.owner !== piece.owner) {
    let i = 0;
    for (const row of gameState.board) {
      let j = 0;
      for (const cell of row) {
        if (gameState.board[i][j].piece.id === gameState.board[move.row][move.col].enPassantOrigin?.id) {
          // gameState.board[i][j].piece.onDeath()
          removePieceAtLocation(gameState, i, j);
        }
        j++;
      }
      i++;
    }
  }
  // Post EP cleanup
  let i = 0;
  for (const row of gameState.board) {
    let j = 0;
    for (const cell of row) {
      gameState.board[i][j].squareStatuses.delete(SquareStatus.EPV);
      gameState.board[i][j].enPassantOrigin = null;
      j++;
    }
    i++;
  }
  // En passant logic
  if (move.flags?.has(MoveFlag.EP)) {
    let pawnPos = 0;
    // Look for the selected pawn *in this column*
    for (let i = 0; i < gameState.board.length; i++) {
      if (gameState.board[i][move.col].squareStatuses.has(SquareStatus.SEL)) {
        pawnPos = i;
        break;
      }
    }
    if (pawnPos < move.row) {
      // En passant square is above
      gameState.board[move.row - 1][move.col].squareStatuses.add(SquareStatus.EPV);
      gameState.board[move.row - 1][move.col].enPassantOrigin = piece;
    } else {
      // En passant square is below
      gameState.board[move.row + 1][move.col].squareStatuses.add(SquareStatus.EPV);
      gameState.board[move.row + 1][move.col].enPassantOrigin = piece;
    }
  }
  gameState.board[move.row][move.col].piece = piece;
  gameState.board[move.row][move.col].piece.nMoves++;
}

const removePieceAtLocation = (gameState: GameState, row: number, col: number) => {
  // .onDeath();
  const player = gameState.board[row][col].piece.owner;
  const graveyard = gameState.graveyards.find((g: Graveyard) => g.player === player);
  graveyard?.contents.push(gameState.board[row][col].piece);
  gameState.board[row][col].piece = EmptySquare();
}

// Reducer
const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    makeMove: (state: GameState, action: PayloadAction<{ row: number, col: number }>) => {
      if (state.selectedRow === null || state.selectedCol === null) return;
      const pieceToMove = state.board[state.selectedRow][state.selectedCol].piece;
      const move = pieceToMove.moveF(pieceToMove, state.selectedRow, state.selectedCol, state, true).find((move: Move) => move.row === action.payload.row
        && move.col === action.payload.col);
      if (!pieceToMove || !move) return;
      const originSquare = state.board[state.selectedRow][state.selectedCol];
      // PRE-MOVE (TODO: transfer to preMove() function)
      // LEAVING
      originSquare.piece = EmptySquare();
      // REMOVING TARGET
      removePieceAtLocation(state, move.row, move.col);
      // ENTERING & EFFECTS
      movePiece(state, pieceToMove, move);
      // CLEANUP
      let i = 0;
      for (const row of state.board) {
        let j = 0;
        for (const cell of row) {
          // TODO: Transfer cleanup to postMove function
          state.board[i][j].squareStatuses.delete(SquareStatus.HL);
          state.board[i][j].squareStatuses.delete(SquareStatus.SEL);
          state.board[i][j].squareStatuses.delete(SquareStatus.HLC);
          state.board[i][j].squareStatuses.delete(SquareStatus.HLK);
          j++;
        }
        i++;
      }
    },
    selectSquare: (state: GameState, action: PayloadAction<{ row: number, col: number }>) => {
      const row = action.payload.row;
      const col = action.payload.col;
      const movesToHighlight: Move[] = state.board[row][col].piece.moveF(state.board[row][col].piece, row, col, state, true);
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
    },
  },
});
export default gameSlice.reducer;
export const { makeMove, selectSquare } = gameSlice.actions;