import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import produce from 'immer';
import { io, Socket } from 'socket.io-client';
import {
  GameJoinedEvent,
  GameCreatedEvent,
  JoinGameEvent,
  CreateGameEvent,
  MoveEvent,
  ConnectEvent,
} from '../../ws/events';
import localBoard from './GameObjects/boards/localBoard';
import { fullGameStateUpdate, GameState } from './state/slices/game/slice';
import {
  addChatItemToLog,
  ChatItem,
  ChatItemType,
  createdOnlineGame,
  joinedOnlineGame,
  setActiveGame,
} from './state/slices/ui/slice';
import { Player } from './types';

export const wsConnect = (url: string) => ({ type: 'WS_CONNECT', url });
export const wsConnected = (url: string) => ({ type: 'WS_CONNECTED', url });
export const wsDisconnect = (url: string) => ({ type: 'WS_DISCONNECT', url });
export const wsDisconnected = (url: string) => ({ type: 'WS_DISCONNECTED', url });
export const wsCreateGame = (url: string) => ({ type: 'WS_CREATE_GAME', url });
export const wsJoinGame = (url: string) => ({ type: 'WS_JOIN_GAME', url });
export const wsEmitMove = (state: GameState) => ({ type: 'WS_MOVE', state });

interface MoveAction {
  state: GameState;
}

const socketMiddleware: Middleware = (api: MiddlewareAPI) => {
  let socket: Socket | null = null;
  let playerId: string | null = null;

  const handleGameCreated = (event: GameCreatedEvent) => {
    playerId = event.playerId;
    api.dispatch(createdOnlineGame(event));
    api.dispatch(setActiveGame(true));
    api.dispatch(fullGameStateUpdate(event.game));
    api.dispatch(
      addChatItemToLog({
        content: `You've created an online game! The code to join your game is ${event.gameId}`,
        time: new Date(),
        origin: '',
        type: ChatItemType.GAME,
      } as ChatItem),
    );
  };

  const handleGameJoined = (event: GameJoinedEvent) => {
    playerId = event.playerId;
    api.dispatch(joinedOnlineGame(event));
    api.dispatch(setActiveGame(true));
    // TODO: Mirror/flip board
    api.dispatch(fullGameStateUpdate(event.game));
    api.dispatch(
      addChatItemToLog({
        content: `You've joined an online game! Game: ${event.gameId}`,
        time: new Date(),
        origin: '',
        type: ChatItemType.GAME,
      } as ChatItem),
    );
  };

  const handleMove = (event: MoveEvent) => {
    if (event.playerId !== playerId) {
      console.log('New state:', event.gameState);
      api.dispatch(fullGameStateUpdate(event.gameState));
    }
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
      console.log('Recieving move');
      handleMove(event);
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
        if (socket === null) connect(action);
        if (socket !== null)
          socket.emit('createGame', {
            game: {
              board: produce(localBoard, () => {}),
              turn: 0,
              selectedRow: null,
              selectedCol: null,
              graveyards: [
                { player: Player.light, contents: [] },
                { player: Player.dark, contents: [] },
              ],
              completed: false,
              winner: null,
            },
          } as CreateGameEvent);
        break;
      case 'WS_JOIN_GAME':
        if (socket === null) connect(action);
        if (socket !== null) socket.emit('joinGame', { id: 'testroom' } as JoinGameEvent);
        break;
      case 'WS_MOVE':
        let moveAction = action as MoveAction;
        console.log('Emitting move:', moveAction.state);
        if (socket !== null) socket.emit('makeMove', { gameState: moveAction.state, playerId: playerId } as MoveEvent);
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware;
