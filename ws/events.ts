import { GameState } from '../client/src/state/slices/game/slice';
import { UserInfo } from '../client/src/types';

export interface ConnectEvent {
  url: string;
}

export interface JoinGameEvent {
  id: string;
  playerName: string;
}

export interface CreateGameEvent {
  game: GameState;
  playerName: string;
}

export interface GameJoinedEvent {
  gameId: string;
  player: UserInfo;
  game: GameState;
  otherPlayers: UserInfo[];
}

export interface GameCreatedEvent {
  gameId: string;
  player: UserInfo;
  game: GameState;
}

export interface PlayerJoinedGameEvent {
  player: UserInfo;
}

export interface MoveEvent {
  gameState: GameState;
  playerId: string;
  gameId: string;
}
