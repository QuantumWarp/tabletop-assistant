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
  ): { [field: string]: any } {
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

  static increment(arg: FixedActionArg) {
    if (!arg.field) return {};
    return { [arg.field]: (arg.value || 0) + 1 };
  }

  static decrement(arg: FixedActionArg) {
    if (!arg.field) return {};
    return { [arg.field]: (arg.value || 0) - 1 };
  }

  static setValue(to: FixedActionArg, from: FixedActionArg) {
    if (!to.field || !from.value) return {};
    return { [to.field]: from.value };
  }

  static toggle(fields: FixedActionArg[]) {
    return fields.reduce((obj, a) => {
      if (!a.field) return obj;
      return { ...obj, [a.field]: !a.value };
    }, {});
  }
}
