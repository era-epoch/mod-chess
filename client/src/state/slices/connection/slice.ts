import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

export interface ConnectionState {
  socket: Socket | null;
}

const initialState = {
  socket: null,
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState: initialState,
  reducers: {
    connect: (state: ConnectionState, action: PayloadAction<string>) => {
      if (state.socket === null) {
        // state.socket = io(action.payload);
        state.socket = io(`http://localhost:5000`); //TODO: Prod.
      }
    },
    disconnect: (state: ConnectionState, action: PayloadAction<string>) => {
      if (state.socket !== null) {
        state.socket.close();
        state.socket = null;
      }
    },
  },
});

export default connectionSlice.reducer;
export const { connect, disconnect } = connectionSlice.actions;
