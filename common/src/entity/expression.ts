export interface Expression {
  expression: string;
  variables: ExpressionVariable[];
}

export interface ExpressionVariable {
  key: string;
  entityId: string;
  fieldKey: string;
}

export interface Macro {
  target: ExpressionVariable,
  expression: Expression,
}
