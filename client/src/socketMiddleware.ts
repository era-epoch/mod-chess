import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import {
  GameJoinedEvent,
  GameCreatedEvent,
  JoinGameEvent,
  CreateGameEvent,
  MoveEvent,
  ConnectEvent,
  PlayerJoinedGameEvent,
} from '../../ws/events';
import { RootState } from './state/rootReducer';
import { fullGameStateUpdate, GameState } from './state/slices/game/slice';
import {
  addChatItemToLog,
  updatePlayer,
  ChatItem,
  ChatItemType,
  createdOnlineGame,
  invertBoard,
  joinedOnlineGame,
  toggleActiveGame,
  anotherPlayerJoinedGame,
} from './state/slices/ui/slice';
import { PlayerColour } from './types';

// TODO: handle URL better
export const wsConnect = (url: string) => ({ type: 'WS_CONNECT', url });
export const wsConnected = (url: string) => ({ type: 'WS_CONNECTED', url });
export const wsDisconnect = (url: string) => ({ type: 'WS_DISCONNECT', url });
export const wsDisconnected = (url: string) => ({ type: 'WS_DISCONNECTED', url });
export const wsCreateGame = (url: string, ops: CreateGameEvent) =>
  ({ type: 'WS_CREATE_GAME', url, ops } as CreateGameAction);
export const wsJoinGame = (url: string, ops: JoinGameEvent) => ({ type: 'WS_JOIN_GAME', url, ops } as JoinAction);
export const wsEmitMove = (state: GameState) => ({ type: 'WS_MOVE', state } as MoveAction);

interface MoveAction {
  type: string;
  state: GameState;
}

interface JoinAction {
  type: string;
  ops: JoinGameEvent;
}

interface CreateGameAction {
  type: string;
  ops: CreateGameEvent;
}

const socketMiddleware: Middleware = (api: MiddlewareAPI) => {
  let socket: Socket | null = null;

  const handleGameCreated = (event: GameCreatedEvent) => {
    api.dispatch(updatePlayer(event.player));
    api.dispatch(createdOnlineGame(event));
    if (event.player.colour === PlayerColour.dark) {
      api.dispatch(invertBoard(true));
    }
    api.dispatch(toggleActiveGame(true));
    api.dispatch(fullGameStateUpdate(event.game));
    api.dispatch(
      addChatItemToLog({
        content: `Welcome, ${event.player.name}. You've created an online game! The code to join your game is ${event.gameId}`,
        time: new Date(),
        origin: '',
        type: ChatItemType.GAME,
      } as ChatItem),
    );
  };

  const handleGameJoined = (event: GameJoinedEvent) => {
    // TODO: better dispatch structure
    api.dispatch(updatePlayer(event.player));
    api.dispatch(joinedOnlineGame(event));
    api.dispatch(toggleActiveGame(true));
    if (event.player.colour === PlayerColour.dark) {
      api.dispatch(invertBoard(true));
    }
    api.dispatch(fullGameStateUpdate(event.game));
    api.dispatch(
      addChatItemToLog({
        content: `You've joined ${event.otherPlayers[0].name}'s online game!`,
        time: new Date(),
        origin: '',
        type: ChatItemType.GAME,
      } as ChatItem),
    );
  };

  const handleMove = (event: MoveEvent) => {
    const state: RootState = api.getState();
    const playerId = state.ui.player.id;
    if (event.playerId !== playerId) {
      console.log('Recieving move:', event.gameState);
      api.dispatch(fullGameStateUpdate(event.gameState));
    }
  };

  const handlePlayerJoinedGame = (event: PlayerJoinedGameEvent) => {
    api.dispatch(anotherPlayerJoinedGame(event));
    api.dispatch(
      addChatItemToLog({
        content: `${event.player.name} has joined the game.`,
        time: new Date(),
        origin: '',
        type: ChatItemType.GAME,
      } as ChatItem),
    );
  };

  const connect = (action: any) => {
    if (socket !== null) {
      socket.close();
    }
    let connectAction = action as ConnectEvent;
    // Set up socket
    socket = io(connectAction.url);
    socket.connect();
    /* Socket events */
    socket.on('gameCreated', (event: GameCreatedEvent) => {
      handleGameCreated(event);
    });
    socket.on('gameJoined', (event: GameJoinedEvent) => {
      handleGameJoined(event);
    });
    socket.on('moveMade', (event: MoveEvent) => {
      handleMove(event);
    });
    socket.on('playerJoinedGame', (event: PlayerJoinedGameEvent) => {
      handlePlayerJoinedGame(event);
    });
  };

  return (next: Dispatch<AnyAction>) => (action: any) => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket === null) connect(action);
        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case 'WS_CREATE_GAME':
        const createAction = action as CreateGameAction;
        if (socket === null) connect(action);
        if (socket !== null) socket.emit('createGame', createAction.ops as CreateGameEvent);
        break;
      case 'WS_JOIN_GAME':
        const joinAction = action as JoinAction;
        if (socket === null) connect(action);
        if (socket !== null) socket.emit('joinGame', joinAction.ops as JoinGameEvent);
        break;
      case 'WS_MOVE':
        const moveAction = action as MoveAction;
        const state: RootState = api.getState();
        console.log('Emitting move:', moveAction.state);
        if (socket !== null)
          socket.emit('makeMove', {
            gameState: moveAction.state,
            playerId: state.ui.player.id,
            gameId: state.ui.gameId,
          } as MoveEvent);
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware;
