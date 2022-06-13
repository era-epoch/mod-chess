import { PlayerColour, UserInfo } from './types';

export const isPlayersTurn = (turn: number, player: UserInfo): boolean => {
  if (turn % 2 === 0) {
    return player.colour === PlayerColour.light;
  } else {
    return player.colour === PlayerColour.dark;
  }
};
