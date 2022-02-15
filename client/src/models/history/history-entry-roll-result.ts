import RollCombo from '../rolling/roll-combo';

export default interface HistoryEntryRollResult {
  id: string;
  date: number;
  objectId?: string;
  actionId?: string;
  rollResult: RollCombo;
}
