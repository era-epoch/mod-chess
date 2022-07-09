import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmptySquare } from '../../../GameObjects/basic/pieces';
import { Graveyard, Move, MoveFlag, PlayerColour, SquareContents, SquareStatus } from '../../../types';
import {
  capturePieceAtLocation,
  movePiece,
  isGameover,
  handleGameover,
  denoteMove,
  nextTurn,
  spawnNewRunes,
} from './helpers';
import emptyBoard from '../../../GameObjects/boards/emptyBoard';
import moveFunctionMap from '../../../GameObjects/pieceFunctionMaps';
import { ChatItem } from '../ui/slice';
import { abilityFunctionMap, AbilityName } from '../../../GameObjects/abilityMap';

export interface GameState {
  board: SquareContents[][];
  turn: number;
  selectedRow: number | null;
  selectedCol: number | null;
  graveyards: Graveyard[];
  lightRunes: number;
  darkRunes: number;
  winner: PlayerColour | null; // null = not finished, PLayer.neutral = Draw
  creatorColour: PlayerColour | null;
  timedGame: boolean;
  gameTime: number;
  turnTimeBack: number;
  moveHistory: ChatItem[];
  lightRuneSpawns: number;
  darkRuneSpawns: number;
  runeDuration: number;
  runeSpawnTurn: number;
  activeAbility: AbilityName;
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
  lightRunes: 0,
  darkRunes: 0,
  winner: null,
  creatorColour: null,
  timedGame: false,
  gameTime: 10,
  turnTimeBack: 1,
  moveHistory: [],
  lightRuneSpawns: 0,
  darkRuneSpawns: 0,
  runeDuration: 0,
  runeSpawnTurn: 0,
  activeAbility: AbilityName.none,
};

// Reducer
const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    fullGameStateUpdate: (state: GameState, action: PayloadAction<GameState>) => {
      state.board = action.payload.board;
      state.graveyards = action.payload.graveyards;
      // state.selectedCol = action.payload.selectedCol;
      // state.selectedRow = action.payload.selectedRow;
      state.turn = action.payload.turn;
      state.lightRunes = action.payload.lightRunes;
      state.darkRunes = action.payload.darkRunes;
      state.winner = action.payload.winner;
      state.creatorColour = action.payload.creatorColour;
      state.timedGame = action.payload.timedGame;
      state.gameTime = action.payload.gameTime;
      state.turnTimeBack = action.payload.turnTimeBack;
      state.moveHistory = action.payload.moveHistory;
      state.lightRuneSpawns = action.payload.lightRuneSpawns;
      state.darkRuneSpawns = action.payload.darkRuneSpawns;
      state.runeDuration = action.payload.runeDuration;
      state.runeSpawnTurn = action.payload.runeSpawnTurn;
      // state.activeAbility = action.payload.activeAbility;
    },
    setUpGame: (state: GameState) => {
      if (state.runeSpawnTurn === 0) {
        spawnNewRunes(state);
      }
    },
    makeMove: (state: GameState, action: PayloadAction<{ row: number; col: number }>) => {
      if (state.selectedRow === null || state.selectedCol === null) return;
      const pieceToMove = state.board[state.selectedRow][state.selectedCol].piece;
      const moveFunction = moveFunctionMap.get(pieceToMove.identifier);
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
      capturePieceAtLocation(state, move.row, move.col, pieceToMove);
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
      // Write an algebraic representation of the move to the history
      denoteMove(state, pieceToMove, move);
      // Check if any gameover conditions are met
      if (isGameover(state, pieceToMove.owner)) {
        handleGameover(state, pieceToMove.owner);
      } else {
        // If not, proceed to next turn
        nextTurn(state);
      }
      state.selectedRow = null;
      state.selectedCol = null;
    },
    selectSquare: (state: GameState, action: PayloadAction<{ row: number; col: number }>) => {
      const row = action.payload.row;
      const col = action.payload.col;
      const movesToHighlight: Move[] = [];
      const moveFunction = moveFunctionMap.get(state.board[row][col].piece.identifier);
      if (moveFunction) movesToHighlight.push(...moveFunction(state.board[row][col].piece, row, col, state, true));
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
    updateActiveAbility: (state: GameState, action: PayloadAction<AbilityName>) => {
      state.activeAbility = action.payload;
    },
    abilitySelect: (state: GameState, action: PayloadAction<{ row: number; col: number }>) => {
      const abilityF = abilityFunctionMap.get(state.activeAbility);
      if (abilityF && state.selectedRow && state.selectedCol) {
        const source = state.board[state.selectedRow][state.selectedCol].piece;
        abilityF(source, action.payload.row, action.payload.col, state);
      }
    },
  },
});
export default gameSlice.reducer;
export const { makeMove, selectSquare, fullGameStateUpdate, setUpGame, updateActiveAbility, abilitySelect } =
  gameSlice.actions;
