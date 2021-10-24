import RollCombo from './roll-combo';

export default class RollComboParser {
  static parse(comboString: string, actionId: string): RollCombo {
    const parts = this.getParts(comboString);
    const parsedCombos = parts.map((x) => this.parsePart(x, actionId));
    const combo = parsedCombos.reduce((arr, x) => arr.concat(x), []);
    return combo;
  }

  static getParts(comboString: string): string[] {
    return comboString
      .split(/([-+]?[\dd]+)/)
      .filter((x) => x !== '');
  }

  static parsePart(part: string, actionId: string): RollCombo {
    const isStatic = !part.includes('d');

    if (isStatic) {
      return [{
        actionId,
        static: true,
        faces: Number(part.replace('+', '')),
      }];
    }

    const isNegative = part.startsWith('-');
    const amount = Number(part.split('d')[0]);
    const faces = (isNegative ? -1 : 1) * Number(part.split('d')[1]);

    return new Array(amount)
      .fill(0)
      .map(() => ({
        actionId,
        faces,
      }));
  }
}
