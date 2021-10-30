interface RollComboEntry {
  actionId?: string;
  static?: boolean;
  staticObjectId?: string;
  faces: number;
  negative?: boolean;
  result? : number;
}

type RollCombo = RollComboEntry[];

export default RollCombo;

export class RollComboHelper {
  static roll(combo: RollCombo): RollCombo {
    return combo.map((x) => ({
      actionId: x.actionId,
      static: x.static,
      faces: x.faces,
      result: x.static ? x.faces : Math.floor(Math.random() * x.faces) + 1,
    }));
  }

  static clone(combo: RollCombo, includeResult = false): RollCombo {
    return combo.map((x) => ({
      actionId: x.actionId,
      static: x.static,
      faces: x.faces,
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
      const key = x.faces;
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
