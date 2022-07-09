import { AbilityFunction, AbilitySelectFunction } from '../types';
import { cureAbilityF, cureSelectF, infectAbilityF, infectSelectF } from './scourge/functions';

export enum AbilityName {
  none = '',
  cure = 'ability-cure',
  infect = 'ability-infect',
}

export interface Ability {
  id: string;
  name: string;
  renderString: string;
  runeCost: number;
  quick: boolean;
  selectF: AbilitySelectFunction;
  abilityF: AbilityFunction;
}

export const ABILITIES: Ability[] = [];

export const abilitySelectMap = new Map<AbilityName, AbilitySelectFunction>([
  [AbilityName.cure, cureSelectF],
  [AbilityName.infect, infectSelectF],
]);

export const abilityFunctionMap = new Map<AbilityName, AbilityFunction>([
  [AbilityName.cure, cureAbilityF],
  [AbilityName.infect, infectAbilityF],
]);
