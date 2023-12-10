import {
  ResolvedRollComboGroup,
  ResolvedRollCombo,
  RollResult,
  RollResultDie,
  RollCombo,
  RollComboGroup,
  Expression,
} from '@/common';

export default class RollHelper {
  static roll(combo: ResolvedRollCombo): RollResult {
    return combo
      .map((x) => RollHelper.rollGroup(x))
      .reduce((arr, x) => arr.concat(x), []);
  }

  static rollGroup(group: ResolvedRollComboGroup): RollResult {
    return new Array(group.number)
      .fill(0)
      .map(() => ({
        static: group.static,
        negative: group.negative,
        faces: group.faces,
        result: group.static ? group.faces : Math.floor(Math.random() * group.faces) + 1,
      }) as RollResultDie);
  }

  static rollSingleDie(die: RollResultDie): RollResultDie {
    return {
      static: die.static,
      negative: die.negative,
      faces: die.faces,
      result: die.static ? die.faces : Math.floor(Math.random() * die.faces) + 1,
    };
  }

  static resolveComputed(
    combo: RollCombo,
    results: { expression: Expression, result: number }[],
  ): ResolvedRollCombo {
    return combo
      .map((x) => ({
        ...x,
        faces: results.find((er) => er.expression === x.facesComputed)?.result || x.faces || 0,
        number: results.find((er) => er.expression === x.numberComputed)?.result || x.number || 0,
      }));
  }

  static totalValue(combo: RollResult): number {
    return combo.reduce(
      (sum, x) => sum + (x.negative ? -1 : 1) * (x.result || 0),
      0,
    );
  }

  static hasMinMax(combo: RollResult): { min: boolean, max: boolean } {
    return {
      min: Boolean(combo.filter((x) => !x.static).find((x) => x.result === 1)),
      max: Boolean(combo.filter((x) => !x.static).find((x) => x.result === x.faces)),
    };
  }

  static stringRepresentation(combo: RollCombo): string {
    const simplified = RollHelper.simplifyCombo(combo);
    const sorted = simplified.sort(RollHelper.compareComboGroup);

    return sorted.reduce((str, x) => {
      let addStr = '';
      if (str !== '') addStr += ' ';
      if (!x.negative && str !== '') addStr += '+ ';
      if (x.negative) addStr += '- ';

      if (!x.static) {
        if (x.number) addStr += x.number;
        if (x.numberComputed) addStr += '?';
        addStr += 'd';
      }

      if (x.faces) addStr += x.faces;
      if (x.facesComputed) addStr += '?';

      return str + addStr;
    }, '');
  }

  static compareComboGroup(a: RollComboGroup, b: RollComboGroup): number {
    if (!a.static && b.static) return 1;
    if (a.static && !b.static) return -1;
    if (b.faces && a.facesComputed) return 1;
    if (a.faces && b.facesComputed) return -1;
    if ((b.faces || 0) - (a.faces || 0) > 0) return -1;
    if ((a.faces || 0) - (b.faces || 0) > 0) return 1;
    if (a.negative && !b.negative) return 1;
    if (!a.negative && b.negative) return -1;
    if (b.number && a.numberComputed) return 1;
    if (a.number && b.numberComputed) return -1;
    if ((b.number || 0) - (a.number || 0) > 0) return -1;
    if ((a.number || 0) - (b.number || 0) > 0) return 1;
    return 0;
  }

  static simplifyCombo(combo: RollCombo): RollCombo {
    let initialCombo = [...combo];
    const newCombo: RollCombo = [];

    while (initialCombo.length !== 0) {
      const element = initialCombo[0];
      initialCombo = initialCombo.slice(1);
      const mergable = initialCombo.find((x) => RollHelper.mergeComboGroups(element, x));

      if (mergable) {
        initialCombo = initialCombo.filter((x) => x !== mergable);
        const merged = RollHelper.mergeComboGroups(element, mergable) as RollComboGroup;
        if (merged.number !== 0 && merged.faces !== 0) {
          initialCombo.push(merged);
        }
      } else {
        newCombo.push(element);
      }
    }

    return newCombo;
  }

  static mergeComboGroups(a: RollComboGroup, b: RollComboGroup): RollComboGroup | boolean {
    if (Boolean(a.static) !== Boolean(b.static)) return false;
    if (a.facesComputed || b.facesComputed) return false;
    if (a.numberComputed || b.numberComputed) return false;

    if (a.static) {
      const facesTotal = (a.negative ? -1 : 1) * (a.faces || 0)
        + (b.negative ? -1 : 1) * (b.faces || 0);
      return { ...a, negative: facesTotal < 0, faces: Math.abs(facesTotal) };
    }

    if (a.faces !== b.faces) return false;

    const numberTotal = ((a.negative ? -1 : 1) * (a.number || 0))
      + ((b.negative ? -1 : 1) * (b.number || 0));
    return { ...a, negative: numberTotal < 0, number: Math.abs(numberTotal) };
  }
}
