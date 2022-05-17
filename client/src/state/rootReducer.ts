import { combineReducers } from 'redux';
import gameReducer from './slices/gameSlice/slice';

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;