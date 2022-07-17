import {
  Entity, RollCombo, RollResult, Values,
} from 'tabletop-assistant-common';
import { RollComboGroup, RollResultDie } from 'tabletop-assistant-common/src/entity/roll';
import ExpressionHelper from './expression.helper';

export default class RollHelper {
  static roll(combo: RollCombo): RollResult {
    return combo
      .map((x) => RollHelper.rollGroup(x))
      .reduce((arr, x) => arr.concat(x), []);
  }

  static rollGroup(group: RollComboGroup): RollResult {
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

  static resolveComputed(combo: RollCombo, entities: Entity[], values: Values[]) {
    return combo
      .map((x) => ({
        ...x,
        faces: x.facesComputed
          ? ExpressionHelper.calculateExpression(x.facesComputed, values, entities)
          : x.faces,
        number: x.numberComputed
          ? ExpressionHelper.calculateExpression(x.numberComputed, values, entities)
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
