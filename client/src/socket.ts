import { Action, AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { GameCreatedEvent, JoinGameEvent } from './events';
import localBoard from './GameObjects/boards/localBoard';
import { GameState, setBoard } from './state/slices/game/slice';
import { createdOnlineGame, setActiveGame } from './state/slices/ui/slice';

export const wsConnect = (url: string) => ({ type: 'WS_CONNECT', url });
export const wsConnected = (url: string) => ({ type: 'WS_CONNECTED', url });
export const wsDisconnect = (url: string) => ({ type: 'WS_DISCONNECT', url });
export const wsDisconnected = (url: string) => ({ type: 'WS_DISCONNECTED', url });
export const wsCreateGame = (url: string) => ({ type: 'WS_CREATE_GAME', url });
export const wsJoinGame = (url: string) => ({ type: 'WS_JOIN_GAME', url });

export interface ConnectAction extends Action {
  url: string;
}

export interface MoveAction extends Action {
  move: Partial<GameState>;
}

const socketMiddleware: Middleware = (api: MiddlewareAPI) => {
  let socket: Socket | null = null;

  const handleGameCreated = (game: GameCreatedEvent) => {
    api.dispatch(createdOnlineGame(game));
    api.dispatch(setActiveGame(true));
    api.dispatch(setBoard(localBoard));
  };

  const handleMove = (moveAction: MoveAction) => {
    console.log('Move:', moveAction.move);
    // api.dispatch(updateFromWS(moveAction.move))
  };

  const connect = (action: any) => {
    if (socket !== null) {
      socket.close();
    }
    let connectAction = action as ConnectAction;

    // Set up socket
    socket = io(connectAction.url);
    socket.connect();
    console.log('websocket opened');

    /* Socket events */
    socket.on('gameCreated', (game: GameCreatedEvent) => {
      console.log('Created game:', game.id);
      handleGameCreated(game);
    });

    socket.on('gameJoined', () => {
      console.log('Joined game');
    });

    socket.on('move', (move: MoveAction) => {
      console.log('Move recieved');
      handleMove(move);
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
        console.log('websocket closed');
        break;
      case 'WS_CREATE_GAME':
        if (socket === null) connect(action);
        console.log('creating game');
        if (socket !== null) socket.emit('createGame');
        break;
      case 'WS_JOIN_GAME':
        if (socket === null) connect(action);
        console.log('joining game');
        if (socket !== null) socket.emit('joinGame', { id: 'testroom' } as JoinGameEvent);
        break;
      case 'WS_MOVE':
        console.log('sending a message', action.msg);
        if (socket !== null) socket.emit('move', JSON.stringify({ message: action.msg }));
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware;
