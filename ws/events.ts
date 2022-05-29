import { GameState } from '../client/src/state/slices/game/slice';
import { SquareContents } from '../client/src/types';

export interface ConnectEvent {
  url: string;
}

export interface JoinGameEvent {
  id: string;
}

export interface CreateGameEvent {
  board: SquareContents[][];
}

export interface GameJoinedEvent {
  gameId: string;
  playerId: string;
  board: SquareContents[][];
}

export interface GameCreatedEvent {
  board: SquareContents[][];
  gameId: string;
  playerId: string;
}

export interface MoveEvent {
  gameState: GameState;
  playerId: string;
}
