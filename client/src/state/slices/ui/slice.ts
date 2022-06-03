import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameJoinedEvent, GameCreatedEvent } from '../../../../../ws/events';

export enum AlertType {
  success = 'success',
  warning = 'warning',
  info = 'info',
  error = 'error',
}

export enum OnlineGameStatus {
  NONE,
  AWAITING,
  SUCCESS,
}

let alertCount = 0;
export const getAlertID = (): number => {
  alertCount++;
  return alertCount;
};

export interface Alert {
  type: AlertType;
  content: string;
  id: number;
}

export enum ChatItemType {
  MESSAGE = 0,
  GAME = 1,
}

export interface ChatItem {
  content: string;
  time: Date;
  origin: string;
  type: ChatItemType;
}

export interface UIState {
  alerts: Alert[];
  activeGame: boolean;
  onlineGameStatus: OnlineGameStatus;
  gameID: string;
  chatlog: ChatItem[];
}

// const testAlerts = [
//   { type: AlertType.success, content: 'successsssssssssssssssssssssssssssssssssssssssssssssssssssssss', id: -1 },
//   { type: AlertType.warning, content: 'warning', id: -2 },
//   { type: AlertType.info, content: 'info', id: -3 },
//   { type: AlertType.error, content: 'error', id: -4 },
// ];

const initialUIState = {
  alerts: [],
  activeGame: false,
  onlineGameStatus: OnlineGameStatus.NONE,
  gameID: '',
  chatlog: [],
};

const UISlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    addAlert: (state: UIState, action: PayloadAction<Alert>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state: UIState, action: PayloadAction<Alert>) => {
      state.alerts = state.alerts.filter((a: Alert) => a.id !== action.payload.id);
    },
    setActiveGame: (state: UIState, action: PayloadAction<boolean>) => {
      state.activeGame = action.payload;
    },
    createdOnlineGame: (state: UIState, action: PayloadAction<GameCreatedEvent>) => {
      state.onlineGameStatus = OnlineGameStatus.AWAITING;
      state.gameID = action.payload.gameId;
    },
    joinedOnlineGame: (state: UIState, action: PayloadAction<GameJoinedEvent>) => {
      state.onlineGameStatus = OnlineGameStatus.SUCCESS;
      state.gameID = action.payload.gameId;
    },
    addChatItemToLog: (state: UIState, action: PayloadAction<ChatItem>) => {
      state.chatlog.push(action.payload);
    },
    clearChatlog: (state: UIState, action: PayloadAction) => {
      state.chatlog = [];
    },
  },
});

export default UISlice.reducer;
export const {
  addAlert,
  removeAlert,
  setActiveGame,
  createdOnlineGame,
  addChatItemToLog,
  clearChatlog,
  joinedOnlineGame,
} = UISlice.actions;
