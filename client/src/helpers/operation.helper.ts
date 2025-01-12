import { SlotMapping } from "../models/slot-mapping";

export enum Operations {
  Increment = 'increment',
  Decrement = 'decrement',
  Detail = 'detail',
  SetValue = 'setValue',
  Toggle = 'toggle',
}

export class OperationHelper {
  static run(operation: Operations, args: SlotMapping[]): SlotMapping[] {
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

  static increment(arg: SlotMapping): SlotMapping {
    return { ...arg, value: Number(arg.value) + 1 };
  }

  static decrement(arg: SlotMapping): SlotMapping {
    return { ...arg, value: Number(arg.value) - 1 };
  }

  static setValue(to: SlotMapping, from: SlotMapping): SlotMapping {
    return { ...to, value: from.value };
  }

  static toggle(mappings: SlotMapping[]): SlotMapping[] {
    return mappings.map((x) => ({ ...x, value: !x.value }));
  }
}
