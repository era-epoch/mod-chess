import { EmptySquare } from '../../../GameObjects/basic/pieces';
import { kingInCheck } from '../../../GameObjects/gameUtil';
import moveFunctionMap from '../../../GameObjects/pieceFunctionMaps';
import {
  Piece,
  Move,
  MoveFlag,
  SquareStatus,
  PieceType,
  Graveyard,
  PlayerColour,
  pieceTypeAlgebriacNotationMap,
} from '../../../types';
import { ChatItem, ChatItemType } from '../ui/slice';
import { GameState } from './slice';

export const colNumToLetterMap = new Map<number, string>([
  [0, 's'],
  [1, 'a'],
  [2, 'b'],
  [3, 'c'],
  [4, 'd'],
  [5, 'e'],
  [6, 'f'],
  [7, 'g'],
  [8, 'h'],
  [9, 'i'],
]);

// Pushes an algebraic notation representation of a move to the game history
export const denoteMove = (state: GameState, piece: Piece, move: Move) => {
  let notation = '';
  // TODO: kingside vs queenside castle
  if (move.flags.includes(MoveFlag.CSTL)) {
    notation += 'O-O';
  } else {
    notation += pieceTypeAlgebriacNotationMap.get(piece.pieceType);
    // Is this a capture?
    if (move.flags.includes(MoveFlag.KILL)) notation += 'x';
    const col = colNumToLetterMap.get(move.col);
    const row = (9 - move.row).toString();
    notation += col + row;
    // Does this move put the other king in Check?
    if (kingInCheck(state, (piece.owner + 1) % 2)) {
      notation += '+';
    }
  }
  // TODO: disambiguate pieces if necessary
  state.moveHistory.push({
    content: notation,
    time: new Date(),
    origin: '',
    type: ChatItemType.GAME,
  } as ChatItem);
};

export const movePiece = (gameState: GameState, piece: Piece, move: Move) => {
  // piece.onMove();
  // Castle Logic
  if (move.flags.includes(MoveFlag.CSTL)) {
    let kingPos = 0;
    // Look for the selected king *in this row*
    for (let i = 0; i < gameState.board[move.row].length; i++) {
      if (gameState.board[move.row][i].squareStatuses.includes(SquareStatus.SEL)) {
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
  if (
    gameState.board[move.row][move.col].squareStatuses.includes(SquareStatus.EPV) &&
    gameState.board[move.row][move.col].enPassantOrigin?.owner !== piece.owner
  ) {
    for (let i = 0; i < gameState.board.length; i++) {
      for (let j = 0; j < gameState.board[i].length; j++) {
        if (gameState.board[i][j].piece.id === gameState.board[move.row][move.col].enPassantOrigin?.id) {
          // gameState.board[i][j].piece.onDeath()
          removePieceAtLocation(gameState, i, j);
        }
      }
    }
  }
  // Post EP cleanup
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board[i].length; j++) {
      gameState.board[i][j].squareStatuses = gameState.board[i][j].squareStatuses.filter((s) => s !== SquareStatus.EPV);
      gameState.board[i][j].enPassantOrigin = null;
    }
  }
  // En passant logic
  if (move.flags.includes(MoveFlag.EP)) {
    let pawnPos = 0;
    // Look for the selected pawn *in this column*
    for (let i = 0; i < gameState.board.length; i++) {
      if (gameState.board[i][move.col].squareStatuses.includes(SquareStatus.SEL)) {
        pawnPos = i;
        break;
      }
    }
    if (pawnPos < move.row) {
      // En passant square is above
      gameState.board[move.row - 1][move.col].squareStatuses.push(SquareStatus.EPV);
      gameState.board[move.row - 1][move.col].enPassantOrigin = piece;
    } else {
      // En passant square is below
      gameState.board[move.row + 1][move.col].squareStatuses.push(SquareStatus.EPV);
      gameState.board[move.row + 1][move.col].enPassantOrigin = piece;
    }
  }
  gameState.board[move.row][move.col].piece = piece;
  gameState.board[move.row][move.col].piece.nMoves++;
};

export const removePieceAtLocation = (gameState: GameState, row: number, col: number) => {
  // .onDeath();
  const player = gameState.board[row][col].piece.owner;
  const graveyard = gameState.graveyards.find((g: Graveyard) => g.player === (player + 1) % 2);
  if (gameState.board[row][col].piece.pieceType !== PieceType.empty) {
    graveyard?.contents.push(gameState.board[row][col].piece);
  }
  gameState.board[row][col].piece = EmptySquare();
};

export const isGameover = (gameState: GameState, player: PlayerColour): boolean => {
  const opponent: PlayerColour = (player + 1) % 2;
  const validMoves: Move[] = [];
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board[0].length; j++) {
      if (gameState.board[i][j].piece.owner === opponent) {
        const moveFunction = moveFunctionMap.get(gameState.board[i][j].piece.pieceIdentifier);
        if (moveFunction) validMoves.push(...moveFunction(gameState.board[i][j].piece, i, j, gameState, true));
      }
    }
  }
  return validMoves.length === 0;
};

export const handleGameover = (gameState: GameState, player: PlayerColour) => {
  const opponent: PlayerColour = (player + 1) % 2;
  if (kingInCheck(gameState, opponent)) {
    // console.log('CHECKMATE');
    gameState.winner = player;
  } else {
    // console.log('STALEMATE');
    gameState.winner = PlayerColour.neutral;
  }
};

export const selectedPieceCanMove = (gameState: GameState, row: number, col: number) => {
  if (gameState.turn % 2 === 0) {
    return gameState.board[row][col].piece.owner === PlayerColour.light;
  } else {
    return gameState.board[row][col].piece.owner === PlayerColour.dark;
  }
};
