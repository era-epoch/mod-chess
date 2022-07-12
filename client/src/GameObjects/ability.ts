import { AbilityFunction, AbilitySelectFunction } from '../types';

export interface Ability {
  id: string;
  name: string;
  renderString: string;
  runeCost: number;
  quick: boolean;
  immediate: boolean;
  selectF: AbilitySelectFunction;
  abilityF: AbilityFunction;
}

export const ABILITIES: Ability[] = [];

export const registerAbility = (a: Ability) => {
  ABILITIES.push(a);
};

export const getAbilityName = (id: string): string | undefined => {
  const A = ABILITIES.find((a: Ability) => a.id === id);
  if (A) return A.name;
};

export const getAbilityRenderString = (id: string): string | undefined => {
  const A = ABILITIES.find((a: Ability) => a.id === id);
  if (A) return A.renderString;
};

export const getAbilityRuneCost = (id: string): number | undefined => {
  const A = ABILITIES.find((a: Ability) => a.id === id);
  if (A) return A.runeCost;
};

export const isAbilityQuick = (id: string): boolean | undefined => {
  const A = ABILITIES.find((a: Ability) => a.id === id);
  if (A) return A.quick;
};

export const isAbilityImmediate = (id: string): boolean | undefined => {
  const A = ABILITIES.find((a: Ability) => a.id === id);
  if (A) return A.immediate;
};

export const getAbilitySelectF = (id: string): AbilitySelectFunction | undefined => {
  const A = ABILITIES.find((a: Ability) => a.id === id);
  if (A) return A.selectF;
};

export const getAbilityF = (id: string): AbilityFunction | undefined => {
  const A = ABILITIES.find((a: Ability) => a.id === id);
  if (A) return A.abilityF;
};
