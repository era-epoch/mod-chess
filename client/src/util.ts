import { Player, UserInfo } from './types';

export const isPlayersTurn = (turn: number, player: UserInfo): boolean => {
  if (turn % 2 === 0) {
    return player.colour === Player.light;
  } else {
    return player.colour === Player.dark;
  }
};
