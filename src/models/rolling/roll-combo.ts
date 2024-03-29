import { v4 as guid } from 'uuid';

interface RollComboEntry {
  id: string;
  actionId?: string;
  static?: boolean;
  faces: number;
  negative?: boolean;
  previous?: number;
  result? : number;
}

type RollCombo = RollComboEntry[];

export default RollCombo;

export class RollComboHelper {
  static roll(combo: RollCombo): RollCombo {
    return combo.map((x) => this.rollSingle(x));
  }

  static rollSingle(entry: RollComboEntry): RollComboEntry {
    return {
      id: guid(),
      actionId: entry.actionId,
      static: entry.static,
      negative: entry.negative,
      faces: entry.faces,
      previous: entry.result,
      result: entry.static ? entry.faces : Math.floor(Math.random() * entry.faces) + 1,
    };
  }

  static clone(combo: RollCombo, includeResult = false): RollCombo {
    return combo.map((x) => ({
      id: guid(),
      actionId: x.actionId,
      static: x.static,
      negative: x.negative,
      faces: x.faces,
      previous: includeResult ? x.previous : undefined,
      result: includeResult ? x.result : undefined,
    }));
  }

  static groupByActionId(combo: RollCombo): { [key: string]: RollCombo } {
    return combo.reduce((obj, x) => {
      const key = x.actionId || '';
      const value = obj[key] || [];
      value.push(x);
      return { ...obj, [key]: value };
    }, {} as { [key: string]: RollCombo });
  }

  static groupByFaces(combo: RollCombo): { [key: number]: RollCombo } {
    return combo.reduce((obj, x) => {
      const key = x.faces * (x.negative ? -1 : 1);
      const value = obj[key] || [];
      value.push(x);
      return { ...obj, [key]: value };
    }, {} as { [key: number]: RollCombo });
  }

  static totalValue(combo: RollCombo): number {
    return combo.reduce(
      (sum, x) => sum + (x.negative ? -1 : 1) * (x.result || 0),
      0,
    );
  }

  static hasMinMax(combo: RollCombo): { min: boolean, max: boolean } {
    return {
      min: Boolean(combo.filter((x) => !x.static).find((x) => x.result === 1)),
      max: Boolean(combo.filter((x) => !x.static).find((x) => x.result === x.faces)),
    };
  }
}
