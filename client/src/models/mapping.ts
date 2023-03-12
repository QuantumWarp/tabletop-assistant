export interface EmptyMapping {
  entityId: string;
  fieldKey: string;
}

export interface Mapping extends EmptyMapping {
  value: any;
}

export const mappingsMatch = (a: EmptyMapping, b: EmptyMapping) => {
  return a.entityId === b.entityId && a.fieldKey === b.fieldKey;
};
