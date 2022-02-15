interface RollComboEntry {
  id: string;
  static: boolean;
  faces: number;
  result?: number;
}

type RollCombo = RollComboEntry[];

export default RollCombo;
