import {
  Entity, ResolvedRollComboGroup, ResolvedRollCombo, RollResult, RollResultDie, ValueMap, RollCombo,
} from 'tabletop-assistant-common';
import ExpressionHelper from './expression.helper';

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
    combo: RollCombo, entities: Entity[], valueMaps: ValueMap[],
  ): ResolvedRollCombo {
    const computedValues: ValueMap[] = valueMaps.map((x) => ({ ...x, mappings: [...x.mappings] }));
    return combo
      .map((x) => ({
        ...x,
        faces: x.facesComputed
          ? ExpressionHelper.calculateExpression(x.facesComputed, computedValues, entities)
          : x.faces,
        number: x.numberComputed
          ? ExpressionHelper.calculateExpression(x.numberComputed, computedValues, entities)
          : x.number,
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
}
