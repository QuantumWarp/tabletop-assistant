import { Expression } from './expression';

export type RollCombo = RollComboGroup[];

export type RollResult = RollResultDie[];

export interface RollComboGroup {
  static: boolean;
  negative: boolean;
  number: number;
  faces: number;
  numberComputed?: Expression,
  facesComputed?: Expression;
}

export interface RollResultDie {
  static: boolean;
  negative: boolean;
  faces: number;
  result: number;
  previous?: number;
}
