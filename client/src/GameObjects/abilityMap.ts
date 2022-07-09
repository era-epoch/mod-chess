import { AbilityFunction } from '../types';
import { cureAbilityF } from './scourge/functions';

export enum AbilityName {
  none = '',
  cure = 'ability-cure',
}

export interface Ability {
  name: string;
  runeCost: number;
  renderString: string;
  F: AbilityFunction;
}

export const abilityFunctionMap = new Map<AbilityName, AbilityFunction>([[AbilityName.cure, cureAbilityF]]);
