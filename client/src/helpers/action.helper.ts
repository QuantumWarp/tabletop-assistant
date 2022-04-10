enum FixedActions {
  Increment = 'increment',
  Decrement = 'decrement',
  Detail = 'detail',
  SetValue = 'setValue',
  Toggle = 'toggle',
}

export default FixedActions;

export class ActionHelper {
  static run(
    operation: FixedActions,
    fieldMappings: { [field: string]: any },
    fieldArguments: string[],
  ): { [field: string]: any } {
    switch (operation) {
      case FixedActions.Increment:
        return this.increment(fieldMappings, fieldArguments[0]);
      case FixedActions.Decrement:
        return this.decrement(fieldMappings, fieldArguments[0]);
      default: throw new Error('Invalid fixed action');
    }
  }

  static increment(fieldMappings: { [field: string]: any }, field: string) {
    const value = fieldMappings[field];
    return { [field]: value + 1 };
  }

  static decrement(fieldMappings: { [field: string]: any }, field: string) {
    const value = fieldMappings[field];
    return { [field]: value - 1 };
  }
}
