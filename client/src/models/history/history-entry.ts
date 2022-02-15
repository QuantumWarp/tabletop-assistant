import HistoryEntryAction from './history-entry-action';
import HistoryEntryCustom from './history-entry-custom';
import HistoryEntryRollResult from './history-entry-roll-result';

type HistoryEntry =
  HistoryEntryAction |
  HistoryEntryCustom |
  HistoryEntryRollResult;

export default HistoryEntry;

export class HistoryEntryHelper {
  static isAction(obj: HistoryEntry): obj is HistoryEntryAction {
    return (obj as HistoryEntryAction).actionId !== undefined;
  }

  static isCustom(obj: HistoryEntry): obj is HistoryEntryCustom {
    return (obj as HistoryEntryCustom).text !== undefined;
  }

  static isRollResult(obj: HistoryEntry): obj is HistoryEntryRollResult {
    return (obj as HistoryEntryRollResult).rollResult !== undefined;
  }
}
