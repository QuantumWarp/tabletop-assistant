enum DisplayType {
  String = 'string',
  Boolean = 'boolean',
  Number = 'number',
  Action = 'action',
}

export default interface DisplaySlot {
  name: string;
  key: string;
  type: DisplayType;
  inverse?: string;
  auto?: string[];
  field?: string;
  value?: any;
}
