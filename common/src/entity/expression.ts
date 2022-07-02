export interface Expression {
  expression: string;
  variables: { [variable: string]: EntityFieldRef },
}

export interface EntityFieldRef {
  entityId: string;
  fieldKey: string;
}

export interface Macro {
  target: EntityFieldRef,
  expression: Expression,
}
