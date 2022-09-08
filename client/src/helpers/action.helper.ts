import { FieldValueMapping } from 'tabletop-assistant-common';

enum FixedActions {
  Increment = 'increment',
  Decrement = 'decrement',
  Detail = 'detail',
  SetValue = 'setValue',
  Toggle = 'toggle',
}

export default FixedActions;

export interface FixedActionArg {
  slot?: string;
  field?: string;
  value?: any;
}

export class ActionHelper {
  static run(
    operation: FixedActions,
    args: FixedActionArg[],
  ): FieldValueMapping[] {
    switch (operation) {
      case FixedActions.Increment:
        return this.increment(args[0]);
      case FixedActions.Decrement:
        return this.decrement(args[0]);
      case FixedActions.SetValue:
        return this.setValue(args[0], args[1]);
      case FixedActions.Toggle:
        return this.toggle(args);
      default: throw new Error('Invalid fixed action');
    }
  }

  static increment(arg: FixedActionArg): FieldValueMapping[] {
    if (!arg.field) return [];
    return [{
      fieldKey: arg.field,
      value: (arg.value || 0) + 1,
    }];
  }

  static decrement(arg: FixedActionArg): FieldValueMapping[] {
    if (!arg.field) return [];
    return [{
      fieldKey: arg.field,
      value: (arg.value || 0) - 1,
    }];
  }

  static setValue(to: FixedActionArg, from: FixedActionArg): FieldValueMapping[] {
    if (!to.field || from.value === undefined) return [];
    return [{
      fieldKey: to.field,
      value: from.value,
    }];
  }

  static toggle(fields: FixedActionArg[]): FieldValueMapping[] {
    return fields
      .filter((x) => Boolean(x.field))
      .map((x) => ({
        fieldKey: x.field as string,
        value: !x.value,
      }));
  }
}
