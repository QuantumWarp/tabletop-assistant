import { Entity } from "./entity/entity";
import { HistoryEntry } from "./history/history-entry";
import { Layout } from "./layout/layout";
import { Note } from "./notes/note";
import { Tabletop } from "./tabletop/tabletop";

export interface ExportConfig {
  tabletop: Tabletop;
  layouts: Layout[];
  entities: Entity[];
  notes: Note[];
  history: HistoryEntry[];
}
