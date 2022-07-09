import { CaptureFunction, DeathFunction, LifecycleFunction, MoveFunction } from '../types';

export interface GamePiece {
  identifier: string;
  moveF: MoveFunction;
  onDeathF: DeathFunction;
  onCaptureF: CaptureFunction;
  onMovedF: LifecycleFunction;
  onTurnStartF: LifecycleFunction;
  onTurnEndF: LifecycleFunction;
  details: React.FC[];
  icon: any;
}

export const GAME_PIECES: GamePiece[] = [];
