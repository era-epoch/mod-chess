import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmptySquare } from '../../../GameObjects/basic/pieces';
import { Graveyard, Move, MoveFlag, PlayerColour, SquareContents, SquareStatus } from '../../../types';
import { removePieceAtLocation, movePiece, isGameover, handleGameover, denoteMove } from './helpers';
import emptyBoard from '../../../GameObjects/boards/emptyBoard';
import moveFunctionMap from '../../../GameObjects/pieceMoveFunctionMap';
import { ChatItem } from '../ui/slice';

export interface GameState {
  board: SquareContents[][];
  turn: number;
  selectedRow: number | null;
  selectedCol: number | null;
  graveyards: Graveyard[];
  winner: PlayerColour | null; // null = not finished, PLayer.neutral = Draw
  creatorColour: PlayerColour | null;
  timedGame: boolean;
  gameTime: number;
  turnTimeBack: number;
  moveHistory: ChatItem[];
}

const initialGameState: GameState = {
  board: emptyBoard,
  turn: 0,
  selectedRow: null,
  selectedCol: null,
  graveyards: [
    { player: PlayerColour.light, contents: [] },
    { player: PlayerColour.dark, contents: [] },
  ],
  winner: null,
  creatorColour: null,
  timedGame: false,
  gameTime: 10,
  turnTimeBack: 1,
  moveHistory: [],
};

// Reducer
const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    fullGameStateUpdate: (state: GameState, action: PayloadAction<GameState>) => {
      state.board = action.payload.board;
      state.graveyards = action.payload.graveyards;
      state.selectedCol = action.payload.selectedCol;
      state.selectedRow = action.payload.selectedRow;
      state.turn = action.payload.turn;
      state.winner = action.payload.winner;
      state.creatorColour = action.payload.creatorColour;
      state.timedGame = action.payload.timedGame;
      state.gameTime = action.payload.gameTime;
      state.turnTimeBack = action.payload.turnTimeBack;
      state.moveHistory = action.payload.moveHistory;
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
      for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board[i].length; j++) {
          // TODO: Transfer cleanup to postMove function
          state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.HL);
          state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.SEL);
          state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.HLC);
          state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.HLK);
        }
      }
      //.onTurnEnd()
      // if () .onRoundEnd()
      // Write an algebraic representation of the move to the history
      denoteMove(state, pieceToMove, move);

      if (isGameover(state, pieceToMove.owner)) handleGameover(state, pieceToMove.owner);
      state.turn++;
      state.selectedRow = null;
      state.selectedCol = null;
    },
    selectSquare: (state: GameState, action: PayloadAction<{ row: number; col: number }>) => {
      const row = action.payload.row;
      const col = action.payload.col;
      const movesToHighlight: Move[] = [];
      // if (selectedPieceCanMove(state, row, col)) {
      const moveFunction = moveFunctionMap.get(state.board[row][col].piece.pieceIdentifier);
      if (moveFunction) movesToHighlight.push(...moveFunction(state.board[row][col].piece, row, col, state, true));
      // }

      const selectedSameSquare = state.selectedRow === row && state.selectedCol === col;
      for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board[i].length; j++) {
          let match = false;
          let castle = false;
          let kill = false;
          let ept = false;
          for (const move of movesToHighlight) {
            if (move.row === i && move.col === j) {
              match = true;
              if (move.flags.includes(MoveFlag.CSTL)) {
                castle = true;
              }
              if (move.flags.includes(MoveFlag.KILL)) {
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
        }
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
