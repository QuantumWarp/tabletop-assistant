import { Mapping } from '../models/mapping';

enum Operations {
  Increment = 'increment',
  Decrement = 'decrement',
  Detail = 'detail',
  SetValue = 'setValue',
  Toggle = 'toggle',
}

export default Operations;

export class OperationHelper {
  static run(operation: Operations, args: Mapping[]): Mapping[] {
    switch (operation) {
      case Operations.Increment:
        return [this.increment(args[0])];
      case Operations.Decrement:
        return [this.decrement(args[0])];
      case Operations.SetValue:
        return [this.setValue(args[0], args[1])];
      case Operations.Toggle:
        return this.toggle(args);
      default: throw new Error('Invalid fixed action');
    }
  }

  static increment(arg: Mapping): Mapping {
    return { ...arg, value: Number(arg.value) + 1 };
  }

  static decrement(arg: Mapping): Mapping {
    return { ...arg, value: Number(arg.value) - 1 };
  }

  static setValue(to: Mapping, from: Mapping): Mapping {
    return { ...to, value: from.value };
  }

  static toggle(mappings: Mapping[]): Mapping[] {
    return mappings.map((x) => ({ ...x, value: !x.value }));
  }
}
