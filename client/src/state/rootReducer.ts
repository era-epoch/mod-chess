import { combineReducers } from 'redux';
import gameReducer from './slices/game/slice';
import UIReducer from './slices/ui/slice';
import connectionReducer from './slices/connection/slice';

const rootReducer = combineReducers({
  game: gameReducer,
  ui: UIReducer,
  connection: connectionReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
