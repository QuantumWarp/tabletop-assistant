import Die from './die';

export default class RollResult {
  baseValue: number;

  results: { die: Die, value: number }[];

  get value(): number {
    return this.results.reduce((val, result) => val + result.value, this.baseValue);
  }

  constructor(
    baseValue: number,
    results: { die: Die, value: number }[],
  ) {
    this.baseValue = baseValue;
    this.results = results;
  }
}
