import Die from './die';

interface FaceCount {
  faces: number;
  count: number;
}

export default class Roll {
  baseValue: number = 0;

  dice: Die[] = [];

  get value(): number {
    return this.dice.reduce((val, die) => val + die.value, this.baseValue);
  }

  get faceDict(): FaceCount[] {
    return this.dice.reduce((arr: FaceCount[], die: Die) => {
      let faceCount = arr.find((x) => x.faces === die.faces);
      if (!faceCount) {
        faceCount = { faces: die.faces, count: 0 };
        arr.push(faceCount);
      }
      faceCount.count += 1;
      return arr;
    }, []);
  }

  withBaseValue(baseValue: number) {
    this.baseValue = baseValue;
    return this;
  }

  withDie(die: Die) {
    this.dice.push(die);
    return this;
  }

  roll() {
    this.dice.forEach((die) => die.roll());
  }
}
