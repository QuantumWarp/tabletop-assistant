export interface Expression {
  expression: string;
  variables: { [variable: string]: EntityFieldRef },
}

export interface EntityFieldRef {
  entityId: string;
  fieldKey: string;
}
