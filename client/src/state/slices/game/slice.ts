import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Graveyard,
  Move,
  MoveFlag,
  Piece,
  PieceIdentifier,
  PieceOrigin,
  PieceType,
  PlayerColour,
  SquareContents,
  SquareStatus,
} from '../../../types';
import {
  capturePieceAtLocation,
  movePiece,
  denoteMove,
  spawnNewRunes,
  handleEndOfTurn,
  clearAOEHighlights,
} from './helpers';
import emptyBoard from '../../../GameObjects/boards/emptyBoard';
import { ChatItem } from '../ui/slice';
import { getMoveF } from '../../../GameObjects/gamePiece';
import { EmptySquare } from '../../../GameObjects/basic/emptySquare';
import { getAbilityF, getAbilitySelectF } from '../../../GameObjects/ability';
import { getCurrentPlayer } from '../../../util';

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
  activeAbility: string;
  abilityActivatedFlag: boolean;
  promoPiece: Piece | null;
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
  activeAbility: '',
  abilityActivatedFlag: false,
  promoPiece: null,
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
      const moveFunction = getMoveF(pieceToMove.identifier);
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
      const moveEndedTurn = movePiece(state, pieceToMove, move);
      // Write an algebraic representation of the move to the history
      // denoteMove(state, pieceToMove, move);
      if (moveEndedTurn) {
        handleEndOfTurn(state, pieceToMove.owner);
      }
    },
    selectSquare: (state: GameState, action: PayloadAction<{ row: number; col: number }>) => {
      const row = action.payload.row;
      const col = action.payload.col;
      const movesToHighlight: Move[] = [];
      const moveFunction = getMoveF(state.board[row][col].piece.identifier);
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
    promotePiece: (state: GameState, action: PayloadAction<PieceIdentifier>) => {
      // TODO: This Better
      let piece: Piece | undefined = undefined;
      if (!state.promoPiece) return;
      for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board[i].length; j++) {
          if (state.board[i][j].piece.id === state.promoPiece.id) {
            piece = state.board[i][j].piece;
          }
        }
      }
      if (!piece) return;
      switch (action.payload) {
        case PieceIdentifier.basicQueen:
          piece.identifier = PieceIdentifier.basicQueen;
          piece.origin = PieceOrigin.basic;
          piece.type = PieceType.queen;
          piece.name = 'Queen';
          break;
        case PieceIdentifier.basicRook:
          piece.identifier = PieceIdentifier.basicRook;
          piece.origin = PieceOrigin.basic;
          piece.type = PieceType.rook;
          piece.name = 'Rook';
          break;
        case PieceIdentifier.basicBishop:
          piece.identifier = PieceIdentifier.basicBishop;
          piece.origin = PieceOrigin.basic;
          piece.type = PieceType.bishop;
          piece.name = 'Bishop';
          break;
        case PieceIdentifier.basicKnight:
          piece.identifier = PieceIdentifier.basicKnight;
          piece.origin = PieceOrigin.basic;
          piece.type = PieceType.knight;
          piece.name = 'Knight';
          break;
      }
      // TODO: Promotion serialization
      state.promoPiece = null;
    },
    resetSelection: (state: GameState) => {
      state.selectedRow = null;
      state.selectedCol = null;
    },
    updateActiveAbility: (state: GameState, action: PayloadAction<string>) => {
      state.activeAbility = action.payload;
      const selectF = getAbilitySelectF(action.payload);
      if (selectF && state.selectedRow && state.selectedCol) {
        const source = state.board[state.selectedRow][state.selectedCol].piece;
        selectF(source, state);
      }
    },
    tryActivateAbility: (state: GameState, action: PayloadAction<{ row: number; col: number }>) => {
      const abilityF = getAbilityF(state.activeAbility);
      if (abilityF && state.selectedRow && state.selectedCol) {
        const source = state.board[state.selectedRow][state.selectedCol].piece;
        abilityF(source, action.payload.row, action.payload.col, state);
      }
    },
    endTurnDirect: (state: GameState) => {
      // Post EP cleanup
      for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board[i].length; j++) {
          state.board[i][j].squareStatuses = state.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.EPV);
          state.board[i][j].enPassantOrigin = null;
        }
      }
      handleEndOfTurn(state, getCurrentPlayer(state.turn));
    },
    clearAOE: (state: GameState) => {
      clearAOEHighlights(state);
    },
  },
});
export default gameSlice.reducer;
export const {
  makeMove,
  selectSquare,
  fullGameStateUpdate,
  setUpGame,
  updateActiveAbility,
  tryActivateAbility,
  resetSelection,
  endTurnDirect,
  clearAOE,
  promotePiece,
} = gameSlice.actions;
