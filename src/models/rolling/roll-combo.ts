interface RollComboEntry {
  actionId?: string;
  static?: boolean;
  staticObjectId?: string;
  faces: number;
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
      result: x.static ? x.faces : Math.floor(Math.random() * x.faces),
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
}
