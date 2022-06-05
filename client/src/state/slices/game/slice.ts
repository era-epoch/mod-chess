import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmptySquare } from '../../../GameObjects/basic/pieces';
import { Graveyard, Move, MoveFlag, Player, SquareContents, SquareStatus } from '../../../types';
import { removePieceAtLocation, movePiece, isGameover, handleGameover, selectedPieceCanMove } from './helpers';
import emptyBoard from '../../../GameObjects/boards/emptyBoard';
import moveFunctionMap from '../../../GameObjects/pieceMoveFunctionMap';

export interface GameState {
  board: SquareContents[][];
  turn: number;
  selectedRow: number | null;
  selectedCol: number | null;
  graveyards: Graveyard[];
  completed: boolean;
  winner: Player | null; // null = not finished, PLayer.neutral = Draw
}

const initialGameState: GameState = {
  board: emptyBoard,
  turn: 0,
  selectedRow: null,
  selectedCol: null,
  graveyards: [
    { player: Player.light, contents: [] },
    { player: Player.dark, contents: [] },
  ],
  completed: false,
  winner: null,
};

// Reducer
const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    fullGameStateUpdate: (state: GameState, action: PayloadAction<GameState>) => {
      state.board = action.payload.board;
      state.completed = action.payload.completed;
      state.graveyards = action.payload.graveyards;
      state.selectedCol = action.payload.selectedCol;
      state.selectedRow = action.payload.selectedRow;
      state.turn = action.payload.turn;
      state.winner = action.payload.winner;
    },
    makeMove: (state: GameState, action: PayloadAction<{ row: number; col: number }>) => {
      if (state.selectedRow === null || state.selectedCol === null) return;
      const pieceToMove = state.board[state.selectedRow][state.selectedCol].piece;
      // TODO: Pass in the actual move to reducer
      // const move = pieceToMove
      //   .moveF(pieceToMove, state.selectedRow, state.selectedCol, state, true)
      //   .find((move: Move) => move.row === action.payload.row && move.col === action.payload.col);
      const moveFunction = moveFunctionMap.get(pieceToMove.pieceIdentifier);
      if (!moveFunction) return;
      const move = moveFunction(pieceToMove, state.selectedRow, state.selectedCol, state, true).find(
        (move: Move) => move.row === action.payload.row && move.col === action.payload.col,
      );
      if (!pieceToMove || !move) return;
      const originSquare = state.board[state.selectedRow][state.selectedCol];
      // PRE-MOVE
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
          state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.HL);
          state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.SEL);
          state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.HLC);
          state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.HLK);
          j++;
        }
        i++;
      }
      //.onTurnEnd()
      // if () .onRoundEnd()
      if (isGameover(state, pieceToMove.owner)) handleGameover(state, pieceToMove.owner);
      state.turn++;
      state.selectedRow = null;
      state.selectedCol = null;
    },
    selectSquare: (state: GameState, action: PayloadAction<{ row: number; col: number }>) => {
      const row = action.payload.row;
      const col = action.payload.col;
      const movesToHighlight: Move[] = [];
      if (selectedPieceCanMove(state, row, col)) {
        const moveFunction = moveFunctionMap.get(state.board[row][col].piece.pieceIdentifier);
        if (moveFunction) movesToHighlight.push(...moveFunction(state.board[row][col].piece, row, col, state, true));
      }
      const selectedSameSquare = state.selectedRow === row && state.selectedCol === col;
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
              state.board[i][j].squareStatuses.push(SquareStatus.HLC);
            } else if (kill) {
              state.board[i][j].squareStatuses.push(SquareStatus.HLK);
            } else if (ept) {
              state.board[i][j].squareStatuses.push(SquareStatus.HLK);
            } else {
              state.board[i][j].squareStatuses.push(SquareStatus.HL);
            }
          } else {
            state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.HL);
            state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.HLC);
            state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.HLK);
          }
          state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.SEL);
          j++;
        }
        i++;
      }
      if (!selectedSameSquare) state.board[row][col].squareStatuses.push(SquareStatus.SEL);
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
export const { makeMove, selectSquare, fullGameStateUpdate } = gameSlice.actions;
