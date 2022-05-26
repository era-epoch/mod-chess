import { Action, AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { GameState } from './state/slices/game/slice';

export const wsConnect = (host: string) => ({ type: 'WS_CONNECT', host });
export const wsConnected = (host: string) => ({ type: 'WS_CONNECTED', host });
export const wsDisconnect = (host: string) => ({ type: 'WS_DISCONNECT', host });
export const wsDisconnected = (host: string) => ({ type: 'WS_DISCONNECTED', host });

export interface ConnectAction extends Action {
  url: string;
}

export interface MoveAction extends Action {
  move: Partial<GameState>;
}

const socketMiddleware: Middleware = (api: MiddlewareAPI) => {
  let socket: Socket | null = null;

  const handleMove = (moveAction: MoveAction) => {
    console.log('Move:', moveAction.move);
    // store.dispatch(updateFromWS(moveAction.move));
    // api.dispatch(updateFromWS(moveAction.move))
  };

  return (next: Dispatch<AnyAction>) => (action: any) => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }
        let connectAction = action as ConnectAction;

        // Set up socket
        socket = io(connectAction.url);
        socket.connect();
        console.log('websocket opened');

        // Socket events
        socket.on('move', (move: MoveAction) => {
          console.log('Move recieved');
          handleMove(move);
        });

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('websocket closed');
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
