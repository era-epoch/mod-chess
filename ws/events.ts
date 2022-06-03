import { GameState } from '../client/src/state/slices/game/slice';
import { SquareContents } from '../client/src/types';

export interface ConnectEvent {
  url: string;
}

export interface JoinGameEvent {
  id: string;
}

export interface CreateGameEvent {
  game: GameState;
}

export interface GameJoinedEvent {
  gameId: string;
  playerId: string;
  game: GameState;
}

export interface GameCreatedEvent {
  gameId: string;
  playerId: string;
  game: GameState;
}

export interface MoveEvent {
  gameState: GameState;
  playerId: string;
}
